import { useQuery } from "@tanstack/react-query";
import { Div, FormItem, Input } from "@vkontakte/vkui";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { ButtonForm } from "../../shared/ui/ButtonForm";

type FormData = {
  username: string;
};
const schema = yup.object().shape({
  username: yup.string().required("Введите имя"),
});
export const UserForm = () => {
  let timeoutIdRef = useRef<null | number>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },

    watch,
  } = useForm<FormData>({ resolver: yupResolver(schema) });
  console.log("🚀 ~ UserForm ~ errors:", errors);
  const [debouncedValue, setDebouncedValue] = useState<string>("");

  const { error, data, isFetching } = useQuery({
    queryKey: ["getAge", debouncedValue],
    queryFn: () =>
      fetch(`https://api.agify.io?name=${debouncedValue.trim()}`).then((res) =>
        res.json()
      ),
    enabled: debouncedValue.trim() !== "",
    staleTime: Infinity, // время потухания кэша, кэш всегда актуальный
  });

  const handleFormSubmit = (data: FormData) => {
    if (timeoutIdRef.current !== null) clearTimeout(timeoutIdRef.current);
    setDebouncedValue(data.username);
  };

  useEffect(() => {
    const subscription = watch((value) => {
      if (timeoutIdRef.current !== null) clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = setTimeout(
        () => setDebouncedValue(value.username || ""),
        3000
      );

      return () => subscription.unsubscribe();
    });
  }, [watch]);

  const getAge = () => {
    if (error) return "Упс, ошибка на сервере";
    if (data) {
      if (data.age) return data.age;
      return "возраст не определен";
    }
    return "";
  };
  const { ref, ...registerUsername } = register("username");

  return (
    <Div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}
      >
        <FormItem
          status={errors.username?.message ? "error" : "valid"}
          noPadding
          bottom={getAge()}
          style={{ maxWidth: "300px" }}
        >
          <Input
            required
            placeholder="Напиши имя"
            type="name"
            getRef={register("username").ref}
            {...registerUsername}
          />
        </FormItem>
        <ButtonForm
          text="Узнать возраст"
          // disabled={isFetching }
          isFetching={isFetching}
          size="s"
          style={{ width: "150px", marginTop: "0", height: "36px" }}
        />
      </form>
    </Div>
  );
};

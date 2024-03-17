import { useQuery } from "@tanstack/react-query";
import { Div, FormItem, Input } from "@vkontakte/vkui";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { ButtonForm } from "../../shared/ui/ButtonForm";

export const UserForm = () => {
  let timeoutIdRef = useRef<null | number>(null);
  const [valueName, setValueName] = useState<string>("");
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

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();
  };

  const buttonClickHandler = () => {
    if (timeoutIdRef.current !== null) clearTimeout(timeoutIdRef.current);
    setDebouncedValue(valueName);
  };

  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValueName(e.target.value);
  };

  useEffect(() => {
    if (timeoutIdRef.current !== null) clearTimeout(timeoutIdRef.current);
    timeoutIdRef.current = setTimeout(() => setDebouncedValue(valueName), 3000);
  }, [valueName]);

  const getAge = () => {
    if (error) return "Упс, ошибка на сервере";
    if (data) {
      if (data.age) return data.age;
      return "возраст не определен";
    }
    return "";
  };
  return (
    <Div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
      <FormItem
        noPadding
        bottom={getAge()}
        style={{ maxWidth: "300px" }}
        onSubmit={handleFormSubmit}
      >
        <Input
          placeholder="Напиши имя"
          value={valueName}
          onChange={inputHandler}
        />
      </FormItem>
      <ButtonForm
        text="Узнать возраст"
        onClick={buttonClickHandler}
        disabled={isFetching || valueName.trim() === ""}
        isFetching={isFetching}
        size="s"
        style={{ width: "150px", marginTop: "0", height: "36px" }}
      />
    </Div>
  );
};

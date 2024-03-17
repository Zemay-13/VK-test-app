import { useQuery } from "@tanstack/react-query";
import { Div, Text, Textarea } from "@vkontakte/vkui";
import { useEffect, useRef } from "react";
import { ButtonForm } from "../../shared/ui/ButtonForm";

export const FactsForm = () => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  console.log(inputRef);
  const { error, data, refetch, isFetching } = useQuery({
    queryKey: ["getFact"],
    queryFn: () =>
      fetch("https://catfact.ninja/fact").then((res) => res.json()),
    enabled: false,
    refetchOnWindowFocus: false,
  });

  function onFocusFirstWord() {
    if (data && inputRef.current !== null) {
      const indexWord = data && data?.fact.indexOf(" ");
      inputRef.current.focus();
      inputRef.current.selectionEnd = indexWord;
    }
  }
  const clickHandler = () => {
    refetch();
  };

  useEffect(() => {
    onFocusFirstWord();
  }, [data]);

  if (error) return <p>{`${"An error has occurred: " + error.message} `}</p>;

  return (
    <Div style={{ display: "flex", flexDirection: "column" }}>
      <ButtonForm
        text="Узнать факт"
        onClick={() => clickHandler()}
        disabled={isFetching}
        isFetching={isFetching}
      />

      <Textarea
        getRef={inputRef}
        value={data ? data?.fact : ""}
        placeholder="Нажми на кнопку и Вселенная откроет тайну!"
        disabled={!data}
      />
      {error && <Text>Упс, возникла ошибка :(</Text>}
    </Div>
  );
};

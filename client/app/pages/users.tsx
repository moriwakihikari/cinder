import Top from "../components/Top";

const url = "http://app:8080/users";

export async function getServerSideProps() {
  const json = await fetch(url).then((r) => r.json());
  const data = json;

  return {
    props: {
      data: data,
    },
  };
}

export default function Users(data: any) {
  return (
    <>
      <title>{"Top"}</title>
      <Top title="ユーザー一覧" data={data} />
    </>
  );
}

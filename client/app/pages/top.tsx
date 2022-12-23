import Dashboard from "../components/Dashboard";

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

export default function Top(data: any) {
  return (
    <>
      <title>{"Top"}</title>
      <Dashboard title="ユーザー一覧" data={data} />
    </>
  );
}

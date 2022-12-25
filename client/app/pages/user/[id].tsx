import UserPage from "../../components/UserPage";

export async function getServerSideProps(ctx: any) {
  const queryId = String(ctx.query.id);
  const url = "http://app:8080/user/" + queryId;
  const json = await fetch(url).then((r) => r.json());
  const data = json;

  return {
    props: {
      data: data,
    },
  };
}

export default function Message(data: any) {
  return (
    <>
      <title>{"syousai"}</title>
      <UserPage data={data} />
    </>
  );
}

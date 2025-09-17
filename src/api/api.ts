interface Props {
  path: string;
  options?: object;
  eventObj?: object;
}

export const fetcher = async ({ path, options }: Props) => {
  const response = await fetch(path, {
    method: "GET",
    credentials: "include",
    ...options,
  });

  if (!response.ok) {
    throw new Error("Fetch request failed");
  }

  return await response.json();
};

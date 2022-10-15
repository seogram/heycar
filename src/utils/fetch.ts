const BASE_URL = "https://polls.apiblueprint.org";

export async function api<T>(
    request: RequestInfo
  ): Promise<T> {
    const response = await fetch(`${BASE_URL}/${request}`);
    const data = await response.json();
    return data;
  }
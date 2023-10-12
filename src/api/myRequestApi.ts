
export async function my_request(url: string) {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Can not access ${url}`);
    }
    return response.json();

}
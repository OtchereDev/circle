export const shortenText = (content: string, len: number) => {
  if (content?.length < len) return content;
  else return content.slice(0, len) + "...";
};

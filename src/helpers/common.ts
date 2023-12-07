export const findAllHashtags = (text: string): string[] => {
  const hashtagRegex = /#\w+/g;
  const matches = text.match(hashtagRegex);
  return matches || [];
};
export const getUniqueTags = (tags: string[]): string[] => {
  const uniqueTags: string[] = [];
  tags.forEach((tag) => {
    if (!uniqueTags.includes(tag)) {
      uniqueTags.push(tag);
    }
  });
  return uniqueTags;
};

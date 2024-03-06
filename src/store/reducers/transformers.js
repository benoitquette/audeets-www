import { capitalize } from '~/utils/string-helpers';

const capitalizeCats = (item) => ({ ...item, category: capitalize(item.category) });

export const sortAndCapitalizeCategories = (response) => {
  return response.map(capitalizeCats).sort((a, b) => a.category.localeCompare(b.category));
};

export const capitalizeCategories = (response) => response.map(capitalizeCats);

export const sortProjects = (response) => response.sort((a, b) => a.title.localeCompare(b.title));

export const flattenProjectsData = (data, length, format) => {
  let res = null;
  if (data) {
    data = sortAndCapitalizeCategories(data);
    res = [];
    for (let i = 0; i < length; i++) {
      let day = {
        name: new Date(data[0].data[i].date).toLocaleDateString('en-us', format),
        date: data[0].data[i].date
      };
      for (let j = 0; j < data.length; j++) {
        const categoryName = data[j].category;
        day[categoryName] = data[j].data[i].score;
      }
      res.push(day);
    }
  }
  return res;
};

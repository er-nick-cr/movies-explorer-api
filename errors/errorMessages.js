const errorMovie = {
  badRequest: 'Переданы некорректные данные при создании фильма.',
  notFound: 'Фильм с указанным _id не найден.',
  forbidden: 'Вы не можете удалять чужие фильмы',
};

const errorUser = {
  unauthorized: 'Неправильный email или пароль',
  unauthorizedToken: 'Неверный токен',
  notFound: 'Нет пользователя с таким id',
  conflictRequest: 'Пользователь c таким email уже существует',
  badRequest: 'Переданы некорректные данные при создании пользователя.',
};

module.exports = { errorMovie, errorUser };

class Store {
  constructor(initState) {
    // Состояние приложения (данные)
    this.state = initState;
    // Слушатели изменений state
    this.listners = [];
  }

  /**
   * Выбор state
   * @return {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка state
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Оповещаем всех подписчиков об изменении стейта
    for (const lister of this.listners) {
      lister();
    }
  }

  /**
   * Подписка на изменение state
   * @param callback {Function}
   * @return {Function} Функция для отписки
   */
  subscribe(callback) {
    this.listners.push(callback);
    // Возвращаем функцию для удаления слушателя
    return () => {
      this.listners = this.listners.filter((item) => item !== callback);
    };
  }

  /**
   * Создание записи
   */
  createItem({ code, title = "Новая запись", selected = false }) {
    this.setState({
      ...this.state,
      items: this.state.items.concat({ code, title, selected }),
    });
  }

  /**
   * Удаление записи по её коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      items: this.state.items.filter((item) => item.code !== code),
    });
  }

  /**
   * Если элемент выбран, увеличивает количество кликов для этого элемента и выделяет элемент.
   * @param code - Код элемента, на который нажали.
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      items: this.state.items.map((item) => {
        if (item.code === code) {
          if (!item.selected) {
            item.selected = true;
            item.countSelected
              ? item.countSelected++
              : (item.countSelected = 1);
          } else {
            item.selected = !item.selected;
          }
          return item;
        }
        const { selected, ...newItem } = item;
        return newItem;
      }),
    });
  }
}

export default Store;

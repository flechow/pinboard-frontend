export class InfoDictionary {
  static getItem(controlName: string): string {
    switch (controlName) {
      case 'address':
        return 'Wpisz adres lub zaznacz go na mapie lewym przyciskiem myszy, wtedy adres uzupełni się automatycznie. Użyj prawego przycisku na mapie aby usunąć znacznik'
      default:
        return '';
    }
  }
}

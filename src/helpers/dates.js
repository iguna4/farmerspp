
import { NativeDateService  } from '@ui-kitten/components';
import React, {useState, useEffect} from 'react';

const i18n = {
  dayNames: {
    short: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
    long: ['Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado', 'Domingo'],
  },
  monthNames: {
    short: ['Jan', 'Fev', 'Març', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    long: [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro',
    ],
  },
};

export const localeDateService = new NativeDateService('pt', { i18n, startDayOfWeek: 1 });

export const useDatepickerState = (initialDate = null) => {
  const [date, setDate] = useState(initialDate);
  return { date, onSelect: setDate };
};
import { encoded, translations } from './data.js';

console.log("Let's rock");
console.log(encoded, translations);

function decodeFields(encoded, translations) {
	const uniqueIds = new Set();
	const decoded = [];

	// Исключаем поля из списка
	const excludeFields = new Set(['groupId', 'service', 'formatSize', 'ca']);

	for (const item of encoded) {
		// Создаем объект с декодированной строкой
		const decodedItem = {};

		for (const [key, value] of Object.entries(item)) {
			if (excludeFields.has(key)) {
				// Если название поля совпадает с исключенным, его не меняет
				decodedItem[key] = value;
			} else {
				if (key.endsWith('Id') && translations.hasOwnProperty(value)) {
					// Добавляем уникальный ID в список
					uniqueIds.add(value);

					// Декодируем значение с помощью массива translations
					decodedItem[key] = translations[value];
				} else {
					// Сохраняем значение как есть
					decodedItem[key] = value;
				}
			}
		}

		// Добавляем раскодированный элемент в массив
		decoded.push(decodedItem);
	}

	return decoded;
}

console.log(decodeFields(encoded, translations));

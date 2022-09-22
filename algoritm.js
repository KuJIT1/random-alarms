/*
Случайный будильник.
Параметры:
	количество будильников (alarmsCount)
	Минимальный перерыв (alarmsBreakTime) (чётное?)
	Начало периода	(alarmsStartTime)
	Конец периода	(alarmsEndTime)
	
	
Формат: Время в секундах

Написать тесты (начать с них?)

TODO:
	Равномерное распределение
	Проверка входных параметров в том числе на возможность получения результатов при таких вводных

Идея реализации:

	
*/


// сервис, разные реализации
function GetAlarmTimes(alarmsCount, alarmsBreakTime, alarmsStartTime, alarmsEndTime){
	CheckParameters(alarmsCount, alarmsBreakTime, alarmsStartTime, alarmsEndTime);
	
	const range = alarmsEndTime - alarmsStartTime + 1;
	const result = [];
	
	for(let i = 0; i < alarmsCount; i++){
		const randomValue = GetRandomInRange(range);		
		InsertValueWithInterval(randomValue, result, alarmsBreakTime, alarmsEndTime)
	}
	
	result.forEach(t => t += alarmsStartTime);
	
	return result;
}

function GetAlarmTimesForHuman(alarmsCount, alarmsBreakTime, alarmsStartTime, alarmsEndTime){
	const seconds = GetAlarmTimes2(alarmsCount, alarmsBreakTime, alarmsStartTime, alarmsEndTime, 1);
	seconds.sort((a,b) => a-b);
	
	console.log(seconds);
	
	return seconds.map(s => {
		const hours = Math.floor(s / (60 * 60));
		const minutes = Math.floor((s % (60 * 60)) / 60);
		const seconds = s % 60;
		
		return `${hours}:${minutes}:${seconds}`;
	});
}

// Just random
function GetAlarmTimes2(alarmsCount, alarmsBreakTime, alarmsStartTime, alarmsEndTime, timeLimit){
	debugger;
	CheckParameters(alarmsCount, alarmsBreakTime, alarmsStartTime, alarmsEndTime);
	
	const range = alarmsEndTime - alarmsStartTime + 1;
	const result = [];
	const startProcessMils = new Date().getTime();
	let currentTime;
	
	do
	{
		const randomValue = GetRandomInRange(range);
		let valueIsOk = true;
		
		for(let i = 0; i < result.length; i++){
			if (Math.abs(randomValue - result[i]) < alarmsBreakTime){
				valueIsOk = false;
				break;
			}
		}
		
		if (valueIsOk){
			result.push(randomValue);
		}
		
		currentTime = new Date().getTime();
	}
	while(result.length < alarmsCount && (currentTime - startProcessMils < timeLimit * 1000))
	
	for(let i = 0; i < result.length; i++){
		result[i] += alarmsStartTime;
	}
	
	return result;
}

function CheckParameters(alarmsCount, alarmsBreakTime, alarmsStartTime, alarmsEndTime){
	if (alarmsEndTime < alarmsStartTime){
		throw Error();
	}
	
	if (alarmsCount <= 0){
		throw Error();
	}
	
	/*
	if (alarmsCount * alarmsBreakTime > alarmsEndTime - alarmsStartTime){
		throw Error();
	}
	*/
}

function GetRandomInRange(range){
	return Math.floor(Math.random() * range);
}

// Проверка на зацикливание.. Выбросить ошибку, если не получилось. Должно отсеиваться на уровне повыше
// Изменения значений - побочное действие
// Плохой вариант, т.к. попадается слишком много занчений через minInterval
function InsertValueWithInterval(value, array, interval, maxValue, deb){
	if (deb){
		debugger;
	}
	
	array.sort((a,b) => a - b); // TODO: побочное действие?
	
	// 1.	
	let {lowerValue, greaterValue, lowerIndex, greaterIndex} = GetCloseValues(value, array, maxValue);
	
	let valueOkForLowerValue = lowerValue === undefined || (lowerValue + interval <= value);
	let valueOkForGreaterValue = greaterValue === undefined || (value + interval <= greaterValue);
	
	if (valueOkForLowerValue && valueOkForGreaterValue){
		console.log(JSON.stringify([value, array, interval, maxValue, true]));
		array.push(value);
		return;
	}
	
	// 2.
		
	if (valueOkForGreaterValue && (lowerValue + 2 * interval <= greaterValue)){ // valueOkForGreaterValue => lowerValue !== undefined
		console.log(JSON.stringify([value, array, interval, maxValue, true]));
		value = lowerValue + interval;
		
		array.push(value);
		return;
	}
	
	if (lowerValue === undefined){
		lowerIndex = 0;
	}
	
	for(let i = lowerIndex; i < array.length - 1; i++){
		if (array[i] + 2 * interval <= array[i+1]){
			console.log(JSON.stringify([value, array, interval, maxValue, true]));
			value = array[i] + interval;
			
			array.push(value);
			return;
		}
	}
	
	const lastArrayItem = array[array.length - 1];
	
	if (lastArrayItem + interval <= maxValue){
		console.log(JSON.stringify([value, array, interval, maxValue, true]));
		value = lastArrayItem + interval;
		
		array.push(value);
		return;
	}
	
	const firstArrayItem = array[0];
	if (firstArrayItem - interval >= 0){
		console.log(JSON.stringify([value, array, interval, maxValue, true]));
		value = firstArrayItem - interval;
		
		array.push(value);
		return;
	}
	
	for (let i = 0; i < lowerIndex; i++){
		if (array[i] + 2 * interval <= array[i+1]){
			console.log(JSON.stringify([value, array, interval, maxValue, true]));
			value = array[i] + interval;
			
			array.push(value);
			return;
		}
	}
	
	console.log(JSON.stringify([value, array, interval, maxValue, true]));
	
	// 3. Не реализовано
	
	/*
		Алгоритм:
		1. Пробуем сделать "как есть". Если не получилось, то
		2. Пробуем двигать value правее, перескакивая через занятые позиции (такой подход делает значеня более упорядоченными. Нужны другие варианты для большей рандомизации.
		3. Если не получилось, ужимаем уже существующие значения, чтобы хватило место для нового
	
	*/
}

function GetCloseValues(value, array){
	let lowerValue, greaterValue, lowerIndex, greaterIndex;
	
	for(let i = 0; i < array.length; i++){
		const item = array[i];
		if ((item <= value) && ((lowerValue === undefined) || (lowerValue < item))){
			lowerValue = item;
			lowerIndex = i;
		} else if ((item > value) && ((greaterValue === undefined) || (greaterValue > item))){
			greaterValue = item;
			greaterIndex = i;
		}
	}
	
	return {lowerValue, greaterValue, lowerIndex, greaterIndex};
}

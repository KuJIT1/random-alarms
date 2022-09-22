<!-- App -->

<App>
	<CountSelector></CountSelector>
	<BreakSecondsSelector></BreakSecondsSelector>
	<Group>
		<TimeMinutesSelector name="startPeriod"></TimeMinutesSelector>
		<TimeMinutesSelector name="endPeriod"></TimeMinutesSelector>
	</Group>
	<EnableToggle></EnableToggle>
	<!-- Show count alarms after toggle -->
	<!-- TODO: schedule -->
</App>


<!-- config 

AppConfig: {
	minAlarmsCount: 1,
	maxAlarmsCount: 10
	minBreakTime: 1,
	maxBreakTime: 24 * 60 * 60 - 1,
	
	defaults: {
		count: 5,
		breackSeconds: 45 * 60,
		startPeriod: 9 * 60,
		endPeriod: 21 * 60
	}
}


StateConfig: {
	enable: boolean,
	count: {
		isRandom: boolean,
		value: number,
		minValue: number [AppConfig.minAlarmsCount - min(AppConfig.maxAlarmsCount, this.maxValue)],
		maxValue: number [max(AppConfig.minAlarmsCount, this.minValue) - AppConfig.maxAlarmsCount]
	},
	breakSeconds: {
		isRandom: boolean,
		value: number,
		minValue: [AppConfig.minBreakTime - min(AppConfig.maxBreakTime, this.maxValue)],
		maxValue: number [max(AppConfig.minBreakTime, this.minValue) - AppConfig.maxBreakTime]
	},
	startPeriod: number,
	endPeriod: number
}




-->

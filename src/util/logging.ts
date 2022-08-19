export const log = (...args: any[]) => {
	if (process.env.DEBUG === "development") {
		console.log(...args);
	}
};

export const warn = (...args: any[]) => {
	if (process.env.DEBUG === "development") {
		console.warn(...args);
	}
};

export const error = (...args: any[]) => {
	if (process.env.DEBUG === "development") {
		console.error(...args);
	}
};

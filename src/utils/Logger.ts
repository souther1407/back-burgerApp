import chalk from "chalk";

class Logger{
    public static success(msg:string | number){
        console.log(chalk.green(msg));
    }
    public static marked(msg:string | number){
        console.log(chalk.magenta(msg));
    }
    public static error(msg:string | number){
        console.log(chalk.red(msg));
    }
}

export default Logger;
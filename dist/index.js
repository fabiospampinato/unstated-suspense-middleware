"use strict";
/* IMPORT */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const unstated_suspense_1 = require("unstated-suspense");
/* SUSPENSE MIDDLEWARE */
class Container extends unstated_suspense_1.Container {
    constructor() {
        super();
        this._middlewares = [];
        this.middlewares();
    }
    middlewares() { }
    addMiddleware(middleware) {
        this._middlewares.push(middleware);
    }
    removeMiddleware(middleware) {
        this._middlewares = this._middlewares.filter(m => m !== middleware);
    }
    setState(updater, callback) {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            this.suspend();
            let prevState = this.state;
            yield _super("setState").call(this, updater, callback);
            for (let i = 0, l = this._middlewares.length; i < l; i++) {
                const middleware = this._middlewares[i];
                this.state = (yield middleware.call(this, prevState)) || this.state;
            }
            this.unsuspend();
        });
    }
}
exports.Container = Container;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLFlBQVk7Ozs7Ozs7Ozs7QUFFWix5REFBNkQ7QUFFN0QseUJBQXlCO0FBRXpCLE1BQU0sU0FBZ0MsU0FBUSw2QkFBb0I7SUFJaEU7UUFFRSxLQUFLLEVBQUcsQ0FBQztRQUpYLGlCQUFZLEdBQWUsRUFBRSxDQUFDO1FBTTVCLElBQUksQ0FBQyxXQUFXLEVBQUcsQ0FBQztJQUV0QixDQUFDO0lBRUQsV0FBVyxLQUFLLENBQUM7SUFFakIsYUFBYSxDQUFHLFVBQW9CO1FBRWxDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFHLFVBQVUsQ0FBRSxDQUFDO0lBRXhDLENBQUM7SUFFRCxnQkFBZ0IsQ0FBRyxVQUFvQjtRQUVyQyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLFVBQVUsQ0FBRSxDQUFDO0lBRXpFLENBQUM7SUFFSyxRQUFRLENBQUcsT0FBa0QsRUFBRSxRQUFxQjs7O1lBRXhGLElBQUksQ0FBQyxPQUFPLEVBQUcsQ0FBQztZQUVoQixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBRTNCLE1BQU0sa0JBQWMsWUFBRyxPQUFPLEVBQUUsUUFBUSxDQUFFLENBQUM7WUFFM0MsS0FBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUc7Z0JBRTFELE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRXhDLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQSxNQUFNLFVBQVUsQ0FBQyxJQUFJLENBQUcsSUFBSSxFQUFFLFNBQVMsQ0FBRSxLQUFJLElBQUksQ0FBQyxLQUFLLENBQUM7YUFFdEU7WUFFRCxJQUFJLENBQUMsU0FBUyxFQUFHLENBQUM7UUFFcEIsQ0FBQztLQUFBO0NBRUY7QUFJTyw4QkFBUyJ9
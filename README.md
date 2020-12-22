# rx-redux

> [响应式编程与实时数据处理：从 RxJS 到 Flink（一）](https://zhuanlan.zhihu.com/p/337399468)

> [函数响应式编程 demo 代码](https://github.com/vthinkxie/ng-pull-refresh)

> [用 RxJS 实现 Redux](http://reader.epubee.com/books/mobile/52/52366fe5ef9ee717bcfc0553ac498be5/text00201.html)

> [使用 redux-observable 实现组件自治](https://juejin.cn/post/6844903661684932616)

> [redux](https://github.com/reduxjs/redux/blob/master/src/createStore.ts)

> [redux-observable](https://github.com/redux-observable/redux-observable)

## 读后感

### 知识点 1. 函数响应式编程 FRP

1. 定义数据源 (UserEvent | Timer | Remote API)
2. 组合数据流 (merge)
    ```ts
    refresh$ = merge(this.clickRefresh$, this.autoRefresh$, this.touchRefresh$).pipe(startWith(true));
    ```
3. 订阅组合后的数据流触发 ==> updateState ==> viewChange
    ```ts
    view$ = this.refresh$.pipe(switchMap(() => this.fetch$));
    ```

#### amazing point

- 原来可以这么顺畅的去写下拉刷新

  ```ts
  import { fromEvent } from "rxjs";

  const touchstart$ = fromEvent<TouchEvent>(document, "touchstart");
  const touchend$ = fromEvent<TouchEvent>(document, "touchend");
  const touchmove$ = fromEvent<TouchEvent>(document, "touchmove");

  const touchRefresh$ = this.touchstart$.pipe(
    switchMap((touchstart) =>
      this.touchmove$.pipe(
        takeUntil(this.touchend$),
        map(
          (touchmove) =>
            touchmove.touches[0].pageY - touchstart.touches[0].pageY
        )
      )
    ),
    filter((position) => position >= 300)
  );
  ```

- 相比之前按照过程式开发是不是清晰简单了很多, 只需关心事件组合的结果, 不再关心过程, 更方便复用.

#### 适用应用场景

- 数据的更新依赖多个数据源, 通过分析找到每一个数据源, 通过组合订阅实现数据的更新

#### 优势

- 分离, 开发复杂路基会变得简单清晰, 更加专注定义数据源的设计, 只要数据源设计好了, 就完成了 90%
- 聚合, 数据的变化变得简单, 订阅数据流不再是多个, 只订阅一个数据流, 不再关注发生的每个事件, 精确追踪事件及数据变化
- 复用, 描述数据源和订阅操作分离, 更容易复用数据源
- 依赖 rxjs, rxjs 真想, 为什么以前没有用起来


### 知识点 2. 数据驱动视图

将视图的改变映射到数据上, 而不是一个个单一的事件

- 举例: 车型选择组件(多弹窗)

### 启发

- 探索 rxjs 和 redux 的关系, 如果 rxjs 能提供类似 redux 的全局数据管理岂不是更香 ??



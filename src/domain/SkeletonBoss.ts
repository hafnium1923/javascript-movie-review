import { SkeletonElement } from "../type/componentType";

class SkeletonBoss {
  private subscriber: SkeletonElement | undefined;

  subscribe(element: SkeletonElement) {
    this.subscriber = element;
  }

  publish() {
    if (this.subscriber) this.subscriber.render();
  }

  removeSkeleton() {
    if (this.subscriber) this.subscriber.removeSkeleton();
  }
}

export default new SkeletonBoss();
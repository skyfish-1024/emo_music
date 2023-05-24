import Vue from "vue";
import {
  Button,
  Input,
  Icon,
  Carousel,
  CarouselItem,
  Popover,
  Radio,
  Select,
  Option,
  Form,
  FormItem,
  Upload,
  Progress,
  Pagination,
  InfiniteScroll,
  Message,
  Empty,
} from "element-ui";

Vue.use(Input)
  .use(Carousel)
  .use(CarouselItem)
  .use(Popover)
  .use(Radio)
  .use(Select)
  .use(Option)
  .use(Form)
  .use(FormItem)
  .use(Upload)
  .use(Progress)
  .use(Pagination)
  .use(InfiniteScroll)
  .use(Empty);
Vue.prototype.$message = Message;

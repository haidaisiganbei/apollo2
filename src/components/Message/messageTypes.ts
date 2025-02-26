import TextMessage from './components/TextMessage.vue';
import ImageMessage from './components/ImageMessage.vue';
import AudioMessage from './components/AudioMessage.vue';
import VideoMessage from './components/VideoMessage.vue';
import LinkMessage from './components/LinkMessage.vue';
import RedEnvelopeMessage from './components/RedEnvelopeMessage.vue';
import CardMessage from './components/CardMessage.vue';
import TransferMessage from './components/TransferMessage.vue';
// 文件消息
import FileMessage from './components/FileMessage.vue';
import LocationMessage from './components/LocationMessage.vue';
import EmojiMessage from './components/EmojiMessage.vue';
import DevMessage from './components/DevMessage.vue';
import SystemMessage from './components/SystemMessage.vue';
import ReferenceMessage from './components/ReferenceMessage.vue';
import MergeMessage from './components/MergeMessage.vue';
import UnknownMessage from './components/UnknownMessage.vue';

const messageTypes: Record<string, { name: string, component: any }> = {
  "1": { name: "文本", component: TextMessage },
  "2": { name: "图片", component: ImageMessage },
  "3": { name: "音频", component: AudioMessage },
  "4": { name: "视频", component: VideoMessage },
  "5": { name: "链接", component: LinkMessage },
  // "6": { name: "红包", component: RedEnvelopeMessage },
  "7": { name: "名片", component: CardMessage },
  "8": { name: "转账", component: TransferMessage },
  // "18": { name: "思维导图", component: UnknownMessage },
  // "19": { name: "表格", component: UnknownMessage },
  // "20": { name: "PDF", component: UnknownMessage },
  // "23": { name: "行程信息", component: UnknownMessage },
  // "24": { name: "小程序", component: UnknownMessage },
  // "25": { name: "富文本", component: UnknownMessage },
  // "26": { name: "群直播", component: UnknownMessage },
  // "27": { name: "比心表情", component: UnknownMessage },
  // "28": { name: "文本及图片", component: UnknownMessage },
  // "29": { name: "文本及视频", component: UnknownMessage },
  // "30": { name: "代付", component: UnknownMessage },
  // "31": { name: "赏赐", component: UnknownMessage },
  // "32": { name: "推荐", component: UnknownMessage },
  // "33": { name: "文本翻译", component: UnknownMessage },
  // "34": { name: "纠错", component: UnknownMessage },
  // "35": { name: "直播分享", component: UnknownMessage },
  // "36": { name: "视频分享", component: UnknownMessage },
  // "37": { name: "图文混合", component: UnknownMessage },
  // "38": { name: "拍一拍", component: UnknownMessage },
  // "39": { name: "动图表情", component: UnknownMessage },
  // "40": { name: "群签到", component: UnknownMessage },
  // "41": { name: "新人报道", component: UnknownMessage },
  "42": { name: "位置分享", component: LocationMessage },
  // "43": { name: "推送消息", component: UnknownMessage },
  // "44": { name: "删除消息", component: UnknownMessage },
  // "45": { name: "添加群组", component: UnknownMessage },
  // "46": { name: "添加好友", component: UnknownMessage },
  // "47": { name: "分享音乐", component: UnknownMessage },
  // "48": { name: "通知消息", component: UnknownMessage },
  // "49": { name: "群语音聊天", component: UnknownMessage },
  // "50": { name: "我的收藏", component: UnknownMessage },
  // "51": { name: "群收款", component: UnknownMessage },
  // "52": { name: "天气", component: UnknownMessage },
  "53": { name: "视频通话", component: TextMessage },
  "54": { name: "视频聊天", component: TextMessage },
  "55": { name: "语音聊天", component: TextMessage },
  // "56": { name: "公众号推送", component: UnknownMessage },
  "57": { name: "共享位置", component: TextMessage },
  // "58": { name: "置顶消息", component: UnknownMessage },
  // "59": { name: "收藏笔记", component: UnknownMessage },
  // "60": { name: "阅后即焚", component: UnknownMessage },
  // "61": { name: "动画表情", component: UnknownMessage },
  // "62": { name: "收款", component: UnknownMessage },
  "63": { name: "群公告", component: TextMessage },
  "64": { name: "位置信息", component: LocationMessage },
  "65": { name: "表情", component: EmojiMessage },
  "66": { name: "系统消息", component: SystemMessage },
  // "67": { name: "商家", component: UnknownMessage },
  "68": { name: "通话", component: TextMessage },
  // "69": { name: "记事本", component: UnknownMessage },
  // "70": { name: "相册", component: UnknownMessage },
  "71": { name: "文件", component: FileMessage },
  // "72": { name: "应用", component: UnknownMessage },
  // "73": { name: "网页", component: UnknownMessage },
  // "74": { name: "投票", component: UnknownMessage },
  // "75": { name: "分享", component: UnknownMessage },
  // "76": { name: "文件夹", component: UnknownMessage },
  // "77": { name: "戳一戳", component: UnknownMessage },
  "78": { name: "合并聊天记录", component: MergeMessage },
  // "79": { name: "群推荐", component: UnknownMessage },
  "80": { name: "引用回复", component: ReferenceMessage },
  // "81": { name: "游戏", component: UnknownMessage },
  // "82": { name: "文档", component: UnknownMessage },
  // "83": { name: "压缩文件", component: UnknownMessage },
  // "84": { name: "任务", component: UnknownMessage },
  // "85": { name: "日程", component: UnknownMessage },
  // "86": { name: "DING", component: UnknownMessage },
  // "87": { name: "群接龙", component: UnknownMessage },
  // "88": { name: "日志", component: UnknownMessage },
  // "89": { name: "震", component: UnknownMessage },
  // "90": { name: "审批", component: UnknownMessage },
  // "91": { name: "邮件", component: UnknownMessage },
  // "92": { name: "捏脸", component: UnknownMessage },
  // "93": { name: "摇骰子", component: UnknownMessage },
  // "94": { name: "音乐", component: UnknownMessage },
  // "95": { name: "pia戏", component: UnknownMessage },
  // "96": { name: "你画我猜", component: UnknownMessage },
  // "97": { name: "语音转文字", component: UnknownMessage },
  "99": { name: "其他", component: UnknownMessage },
  "100": { name: "Dev", component: DevMessage }
};

export default messageTypes;
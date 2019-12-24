<template>
	<view class="weather-city-main">
		<cu-custom bgColor="bg-brick" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">选择城市</block>
		</cu-custom>
		<view class="cu-bar bg-white search fixed" :style="[{ top: customBar + 'px' }]">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input class="m-input" :value="inputVal" @input="inputChange" type="text" placeholder="输入搜索的关键词"></input>
			</view>
		</view>
		<scroll-view
			v-show="!isSearch"
			scroll-y
			class="indexes"
			:scroll-into-view="'indexes-' + listCurID"
			:style="[{ height: 'calc(100vh - ' + customBar + 'px - 50px)' }]"
			:scroll-with-animation="true"
			:enable-back-to-top="true"
		>
			<view class="indexItem-hot">
				<view class="padding">热门城市</view>
				<view class="m-list padding-left-sm" style="padding-right: 100rpx;">
					<view @tap="hotLink(o)" class='cu-tag' style="margin: 10rpx 5rpx;" v-for="(o, i) in hotCity" :key="i">{{o}}</view>
				</view>
			</view>
			
			<block v-for="(item, index) in list" :key="index">
				<view :class="'indexItem-' + item.name" :id="'indexes-' + item.name" :data-index="item.name">
					<view class="padding">{{ item.name }}</view>
					<view class="m-list no-padding">
						<view class="solid-bottom" v-for="(items, sub) in item.list" :key="sub" @tap="link(index,sub)">
								<view class="padding text-grey m-city">
									{{items.city}}
								</view>
						</view>
					</view>
				</view>
			</block>
		</scroll-view>
		
		<scroll-view
			v-show="isSearch"
			scroll-y
			class="indexes"
			:scroll-into-view="'indexes-' + listCurID"
			:style="[{ height: 'calc(100vh - ' + customBar + 'px - 50px)' }]"
			:scroll-with-animation="true"
			:enable-back-to-top="true"
		>
			<view class="solid-bottom" v-for="(item, index) in searchResult" :key="index">
				<view class="padding text-grey m-city" @tap="searchLink(index)">
					{{item.city}}
				</view>
			</view>
		</scroll-view>
		
		<view v-if="!isSearch" class="indexBar" :style="[{ height: 'calc(100vh - ' + customBar + 'px - 50px)' }]">
			<view class="indexBar-box" @touchstart="tStart" @touchend="tEnd" @touchmove.stop="tMove">
				<view class="indexBar-item" v-for="(item, index) in list" :key="index" :id="index" @touchstart="getCur" @touchend="setCur">{{ item.name }}</view>
			</view>
		</view>
		<!--选择显示-->
		<view v-show="!hidden" class="indexToast">{{ listCur }}</view>
	</view>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapActions: weatherActions, mapGetters: weatherGetters } = createNamespacedHelpers('weather');
export default {
	data() {
		return {
			customBar: this.CustomBar,
			hidden: true,
			listCurID: '',
			list: [{"name":"A","list":[{"cityid":33,"parentid":0,"citycode":"101330101","city":"澳门","index":"A","keyword":"澳门AOMENAM"},{"cityid":35,"parentid":2,"citycode":"101220601","city":"安庆","index":"A","keyword":"安庆ANQINGAQ"},{"cityid":111,"parentid":7,"citycode":"101260301","city":"安顺","index":"A","keyword":"安顺ANSHUNAS"},{"cityid":245,"parentid":17,"citycode":"101070301","city":"鞍山","index":"A","keyword":"鞍山ANSHANAS"},{"cityid":311,"parentid":23,"citycode":"101110701","city":"安康","index":"A","keyword":"安康ANKANGAK"},{"cityid":3246,"parentid":383,"citycode":"101210203","city":"安吉县","index":"A","keyword":"安吉县ANJIXIANAJX"}]},{"name":"B","list":[{"cityid":1,"parentid":0,"citycode":"101010100","city":"北京","index":"B","keyword":"北京BEIJINGBJ"},{"cityid":36,"parentid":2,"citycode":"101220201","city":"蚌埠","index":"B","keyword":"蚌埠BANGBUBB"},{"cityid":50,"parentid":2,"citycode":"101220901","city":"亳州","index":"B","keyword":"亳州BOZHOUBZ"},{"cityid":98,"parentid":6,"citycode":"101301001","city":"百色","index":"B","keyword":"百色BAISEBS"},{"cityid":99,"parentid":6,"citycode":"101301301","city":"北海","index":"B","keyword":"北海BEIHAIBH"},{"cityid":138,"parentid":9,"citycode":"101090201","city":"保定","index":"B","keyword":"保定BAODINGBD"},{"cityid":212,"parentid":14,"citycode":"101060601","city":"白城","index":"B","keyword":"白城BAICHENGBC"},{"cityid":213,"parentid":14,"citycode":"101060901","city":"白山","index":"B","keyword":"白山BAISHANBS"},{"cityid":260,"parentid":18,"citycode":"101080201","city":"包头","index":"B","keyword":"包头BAOTOUBT"},{"cityid":284,"parentid":21,"citycode":"101121101","city":"滨州","index":"B","keyword":"滨州BINZHOUBZ"},{"cityid":312,"parentid":23,"citycode":"101110901","city":"宝鸡","index":"B","keyword":"宝鸡BAOJIBJ"},{"cityid":324,"parentid":25,"citycode":"101270901","city":"巴中","index":"B","keyword":"巴中BAZHONGBZ"},{"cityid":370,"parentid":29,"citycode":"101290501","city":"保山","index":"B","keyword":"保山BAOSHANBS"},{"cityid":3232,"parentid":382,"citycode":"101210114","city":"滨江区","index":"B","keyword":"滨江区BINJIANGQUBJQ"},{"cityid":3282,"parentid":387,"citycode":"101210410","city":"北仑区","index":"B","keyword":"北仑区BEILUNQUBLQ"}]},{"name":"C","list":[{"cityid":38,"parentid":2,"citycode":"101221701","city":"池州","index":"C","keyword":"池州CHIZHOUCZ"},{"cityid":39,"parentid":2,"citycode":"101221101","city":"滁州","index":"C","keyword":"滁州CHUZHOUCZ"},{"cityid":77,"parentid":5,"citycode":"101281501","city":"潮州","index":"C","keyword":"潮州CHAOZHOUCZ"},{"cityid":100,"parentid":6,"citycode":"101300201","city":"崇左","index":"C","keyword":"崇左CHONGZUOCZ"},{"cityid":139,"parentid":9,"citycode":"101090701","city":"沧州","index":"C","keyword":"沧州CANGZHOUCZ"},{"cityid":140,"parentid":9,"citycode":"101090402","city":"承德","index":"C","keyword":"承德CHENGDECD"},{"cityid":198,"parentid":13,"citycode":"101250601","city":"常德","index":"C","keyword":"常德CHANGDECD"},{"cityid":199,"parentid":13,"citycode":"101250501","city":"郴州","index":"C","keyword":"郴州CHENZHOUCZ"},{"cityid":222,"parentid":15,"citycode":"101191101","city":"常州","index":"C","keyword":"常州CHANGZHOUCZ"},{"cityid":247,"parentid":17,"citycode":"101071201","city":"朝阳","index":"C","keyword":"朝阳CHAOYANGCY"},{"cityid":261,"parentid":18,"citycode":"101080601","city":"赤峰","index":"C","keyword":"赤峰CHIFENGCF"},{"cityid":321,"parentid":25,"citycode":"101270101","city":"成都","index":"C","keyword":"成都CHENGDOUCD"},{"cityid":3241,"parentid":382,"citycode":"101210104","city":"淳安县","index":"C","keyword":"淳安县CHUNANXIANCAX"},{"cityid":3285,"parentid":387,"citycode":"101210403","city":"慈溪市","index":"C","keyword":"慈溪市CIXISHICXS"},{"cityid":3312,"parentid":390,"citycode":"101210709","city":"苍南县","index":"C","keyword":"苍南县CANGNANXIANCNX"},{"cityid":3321,"parentid":392,"citycode":"101211002","city":"常山县","index":"C","keyword":"常山县CHANGSHANXIANCSX"}]},{"name":"D","list":[{"cityid":63,"parentid":4,"citycode":"101160201","city":"定西","index":"D","keyword":"定西DINGXIDX"},{"cityid":167,"parentid":11,"citycode":"101050901","city":"大庆","index":"D","keyword":"大庆DAQINGDQ"},{"cityid":244,"parentid":17,"citycode":"101070201","city":"大连","index":"D","keyword":"大连DALIANDL"},{"cityid":248,"parentid":17,"citycode":"101070601","city":"丹东","index":"D","keyword":"丹东DANDONGDD"},{"cityid":285,"parentid":21,"citycode":"101120401","city":"德州","index":"D","keyword":"德州DEZHOUDZ"},{"cityid":286,"parentid":21,"citycode":"101121201","city":"东营","index":"D","keyword":"东营DONGYINGDY"},{"cityid":301,"parentid":22,"citycode":"101100201","city":"大同","index":"D","keyword":"大同DATONGDT"},{"cityid":325,"parentid":25,"citycode":"101270601","city":"达州","index":"D","keyword":"达州DAZHOUDZ"},{"cityid":326,"parentid":25,"citycode":"101272001","city":"德阳","index":"D","keyword":"德阳DEYANGDY"},{"cityid":3244,"parentid":383,"citycode":"101210204","city":"德清县","index":"D","keyword":"德清县DEQINGXIANDQX"},{"cityid":3264,"parentid":385,"citycode":"101210905","city":"东阳市","index":"D","keyword":"东阳市DONGYANGSHIDYS"},{"cityid":3309,"parentid":390,"citycode":"101210706","city":"洞头区","index":"D","keyword":"洞头区DONGTOUQUDTQ"},{"cityid":3315,"parentid":391,"citycode":"101211106","city":"定海区","index":"D","keyword":"定海区DINGHAIQUDHQ"},{"cityid":3317,"parentid":391,"citycode":"101211104","city":"岱山县","index":"D","keyword":"岱山县DAISHANXIANDSX"}]},{"name":"E","list":[{"cityid":181,"parentid":12,"citycode":"101200301","city":"鄂州","index":"E","keyword":"鄂州EZHOUEZ"},{"cityid":262,"parentid":18,"citycode":"101080701","city":"鄂尔多斯","index":"E","keyword":"鄂尔多斯EERDUOSIEEDS"}]},{"name":"F","list":[{"cityid":40,"parentid":2,"citycode":"101220801","city":"阜阳","index":"F","keyword":"阜阳FUYANGFY"},{"cityid":52,"parentid":3,"citycode":"101230101","city":"福州","index":"F","keyword":"福州FUZHOUFZ"},{"cityid":79,"parentid":5,"citycode":"101280800","city":"佛山","index":"F","keyword":"佛山FOSHANFS"},{"cityid":101,"parentid":6,"citycode":"101301401","city":"防城港","index":"F","keyword":"防城港FANGCHENGGANGFCG"},{"cityid":233,"parentid":16,"citycode":"101240401","city":"抚州","index":"F","keyword":"抚州FUZHOUFZ"},{"cityid":3238,"parentid":382,"citycode":"101210108","city":"富阳区","index":"F","keyword":"富阳区FUYANGQUFYQ"},{"cityid":3286,"parentid":387,"citycode":"101210405","city":"奉化区","index":"F","keyword":"奉化区FENGHUAQUFHQ"}]},{"name":"G","list":[{"cityid":64,"parentid":4,"citycode":"101161201","city":"甘南州","index":"G","keyword":"甘南州GANNANZHOUGNZ"},{"cityid":75,"parentid":5,"citycode":"101280101","city":"广州","index":"G","keyword":"广州GUANGZHOUGZ"},{"cityid":97,"parentid":6,"citycode":"101300501","city":"桂林","index":"G","keyword":"桂林GUILINGL"},{"cityid":102,"parentid":6,"citycode":"101300801","city":"贵港","index":"G","keyword":"贵港GUIGANGGG"},{"cityid":110,"parentid":7,"citycode":"101260101","city":"贵阳","index":"G","keyword":"贵阳GUIYANGGY"},{"cityid":234,"parentid":16,"citycode":"101240701","city":"赣州","index":"G","keyword":"赣州GANZHOUGZ"},{"cityid":270,"parentid":19,"citycode":"101170401","city":"固原","index":"G","keyword":"固原GUYUANGY"},{"cityid":329,"parentid":25,"citycode":"101272101","city":"广元","index":"G","keyword":"广元GUANGYUANGY"},{"cityid":3231,"parentid":382,"citycode":"101210112","city":"拱墅区","index":"G","keyword":"拱墅区GONGSHUQUGSQ"}]},{"name":"H","list":[{"cityid":41,"parentid":2,"citycode":"101221201","city":"淮北","index":"H","keyword":"淮北HUAIBEIHB"},{"cityid":42,"parentid":2,"citycode":"101220401","city":"淮南","index":"H","keyword":"淮南HUAINANHN"},{"cityid":43,"parentid":2,"citycode":"101221001","city":"黄山","index":"H","keyword":"黄山HUANGSHANHS"},{"cityid":80,"parentid":5,"citycode":"101281201","city":"河源","index":"H","keyword":"河源HEYUANHY"},{"cityid":81,"parentid":5,"citycode":"101280301","city":"惠州","index":"H","keyword":"惠州HUIZHOUHZ"},{"cityid":103,"parentid":6,"citycode":"101301201","city":"河池","index":"H","keyword":"河池HECHIHC"},{"cityid":104,"parentid":6,"citycode":"101300701","city":"贺州","index":"H","keyword":"贺州HEZHOUHZ"},{"cityid":119,"parentid":8,"citycode":"101310101","city":"海口","index":"H","keyword":"海口HAIKOUHK"},{"cityid":141,"parentid":9,"citycode":"101091001","city":"邯郸","index":"H","keyword":"邯郸HANDANHD"},{"cityid":142,"parentid":9,"citycode":"101090801","city":"衡水","index":"H","keyword":"衡水HENGSHUIHS"},{"cityid":152,"parentid":10,"citycode":"101181201","city":"鹤壁","index":"H","keyword":"鹤壁HEBIHB"},{"cityid":166,"parentid":11,"citycode":"101050101","city":"哈尔滨","index":"H","keyword":"哈尔滨HAERBINHEB"},{"cityid":169,"parentid":11,"citycode":"101051201","city":"鹤岗","index":"H","keyword":"鹤岗HEGANGHG"},{"cityid":170,"parentid":11,"citycode":"101050601","city":"黑河","index":"H","keyword":"黑河HEIHEHH"},{"cityid":182,"parentid":12,"citycode":"101200501","city":"黄冈","index":"H","keyword":"黄冈HUANGGANGHG"},{"cityid":183,"parentid":12,"citycode":"101200601","city":"黄石","index":"H","keyword":"黄石HUANGSHIHS"},{"cityid":201,"parentid":13,"citycode":"101251201","city":"怀化","index":"H","keyword":"怀化HUAIHUAHH"},{"cityid":223,"parentid":15,"citycode":"101190901","city":"淮安","index":"H","keyword":"淮安HUAIANHA"},{"cityid":251,"parentid":17,"citycode":"101071401","city":"葫芦岛","index":"H","keyword":"葫芦岛HULUDAOHLD"},{"cityid":257,"parentid":18,"citycode":"101080101","city":"呼和浩特","index":"H","keyword":"呼和浩特HUHEHAOTEHHHT"},{"cityid":263,"parentid":18,"citycode":"101081001","city":"呼伦贝尔","index":"H","keyword":"呼伦贝尔HULUNBEIERHLBE"},{"cityid":278,"parentid":20,"citycode":"101150401","city":"海南州","index":"H","keyword":"海南州HAINANZHOUHNZ"},{"cityid":287,"parentid":21,"citycode":"101121001","city":"菏泽","index":"H","keyword":"菏泽HEZEHZ"},{"cityid":313,"parentid":23,"citycode":"101110801","city":"汉中","index":"H","keyword":"汉中HANZHONGHZ"},{"cityid":382,"parentid":30,"citycode":"101210101","city":"杭州","index":"H","keyword":"杭州HANGZHOUHZ"},{"cityid":383,"parentid":30,"citycode":"101210201","city":"湖州","index":"H","keyword":"湖州HUZHOUHZ"},{"cityid":3249,"parentid":384,"citycode":"101210303","city":"海宁市","index":"H","keyword":"海宁市HAININGSHIHNS"},{"cityid":3253,"parentid":384,"citycode":"101210306","city":"海盐县","index":"H","keyword":"海盐县HAIYANXIANHYX"},{"cityid":3278,"parentid":387,"citycode":"101210402","city":"海曙区","index":"H","keyword":"海曙区HAISHUQUHSQ"},{"cityid":3296,"parentid":389,"citycode":"101210612","city":"黄岩区","index":"H","keyword":"黄岩区HUANGYANQUHYQ"},{"cityid":3400,"parentid":2,"citycode":"101220101","city":"合肥","index":"H","keyword":"合肥HEFEIHF"}]},{"name":"J","list":[{"cityid":65,"parentid":4,"citycode":"101161401","city":"嘉峪关","index":"J","keyword":"嘉峪关JIAYUGUANJYG"},{"cityid":66,"parentid":4,"citycode":"101160601","city":"金昌","index":"J","keyword":"金昌JINCHANGJC"},{"cityid":67,"parentid":4,"citycode":"101160801","city":"酒泉","index":"J","keyword":"酒泉JIUQUANJQ"},{"cityid":82,"parentid":5,"citycode":"101281101","city":"江门","index":"J","keyword":"江门JIANGMENJM"},{"cityid":83,"parentid":5,"citycode":"101281901","city":"揭阳","index":"J","keyword":"揭阳JIEYANGJY"},{"cityid":154,"parentid":10,"citycode":"101181101","city":"焦作","index":"J","keyword":"焦作JIAOZUOJZ"},{"cityid":171,"parentid":11,"citycode":"101051101","city":"鸡西","index":"J","keyword":"鸡西JIXIJX"},{"cityid":172,"parentid":11,"citycode":"101050401","city":"佳木斯","index":"J","keyword":"佳木斯JIAMUSIJMS"},{"cityid":184,"parentid":12,"citycode":"101201401","city":"荆门","index":"J","keyword":"荆门JINGMENJM"},{"cityid":236,"parentid":16,"citycode":"101240801","city":"景德镇","index":"J","keyword":"景德镇JINGDEZHENJDZ"},{"cityid":252,"parentid":17,"citycode":"101070701","city":"锦州","index":"J","keyword":"锦州JINZHOUJZ"},{"cityid":282,"parentid":21,"citycode":"101120101","city":"济南","index":"J","keyword":"济南JINANJN"},{"cityid":288,"parentid":21,"citycode":"101120701","city":"济宁","index":"J","keyword":"济宁JININGJN"},{"cityid":302,"parentid":22,"citycode":"101100601","city":"晋城","index":"J","keyword":"晋城JINCHENGJC"},{"cityid":303,"parentid":22,"citycode":"101100401","city":"晋中","index":"J","keyword":"晋中JINZHONGJZ"},{"cityid":384,"parentid":30,"citycode":"101210301","city":"嘉兴","index":"J","keyword":"嘉兴JIAXINGJX"},{"cityid":385,"parentid":30,"citycode":"101210901","city":"金华","index":"J","keyword":"金华JINHUAJH"},{"cityid":3233,"parentid":382,"citycode":"101210111","city":"江干区","index":"J","keyword":"江干区JIANGGANQUJGQ"},{"cityid":3237,"parentid":382,"citycode":"101210105","city":"建德市","index":"J","keyword":"建德市JIANDESHIJDS"},{"cityid":3250,"parentid":384,"citycode":"101210302","city":"嘉善县","index":"J","keyword":"嘉善县JIASHANXIANJSX"},{"cityid":3255,"parentid":385,"citycode":"101210910","city":"金东区","index":"J","keyword":"金东区JINDONGQUJDQ"},{"cityid":3272,"parentid":386,"citycode":"101210804","city":"缙云县","index":"J","keyword":"缙云县JINYUNXIANJYX"},{"cityid":3277,"parentid":386,"citycode":"101210809","city":"景宁县","index":"J","keyword":"景宁县JINGNINGXIANJNX"},{"cityid":3279,"parentid":387,"citycode":"101210407","city":"江东区","index":"J","keyword":"江东区JIANGDONGQUJDQ"},{"cityid":3280,"parentid":387,"citycode":"101210409","city":"江北区","index":"J","keyword":"江北区JIANGBEIQUJBQ"},{"cityid":3295,"parentid":389,"citycode":"101210611","city":"椒江区","index":"J","keyword":"椒江区JIAOJIANGQUJJQ"},{"cityid":3320,"parentid":392,"citycode":"101211005","city":"江山市","index":"J","keyword":"江山市JIANGSHANSHIJSS"}]},{"name":"K","list":[{"cityid":359,"parentid":28,"citycode":"101130201","city":"克拉玛依","index":"K","keyword":"克拉玛依KELAMAYIKLMY"},{"cityid":366,"parentid":29,"citycode":"101290101","city":"昆明","index":"K","keyword":"昆明KUNMINGKM"},{"cityid":3021,"parentid":353,"citycode":"101130601","city":"库尔勒","index":"K","keyword":"库尔勒KUERLEKEL"},{"cityid":3322,"parentid":392,"citycode":"101211003","city":"开化县","index":"K","keyword":"开化县KAIHUAXIANKHX"},{"cityid":3658,"parentid":388,"citycode":"101210506","city":"柯桥区","index":"K","keyword":"柯桥区KEQIAOQUKQQ"}]},{"name":"L","list":[{"cityid":44,"parentid":2,"citycode":"101221501","city":"六安","index":"L","keyword":"六安LIUANLA"},{"cityid":53,"parentid":3,"citycode":"101230701","city":"龙岩","index":"L","keyword":"龙岩LONGYANLY"},{"cityid":61,"parentid":4,"citycode":"101160101","city":"兰州","index":"L","keyword":"兰州LANZHOULZ"},{"cityid":69,"parentid":4,"citycode":"101161010","city":"陇南","index":"L","keyword":"陇南LONGNANLN"},{"cityid":105,"parentid":6,"citycode":"101300401","city":"来宾","index":"L","keyword":"来宾LAIBINLB"},{"cityid":106,"parentid":6,"citycode":"101300301","city":"柳州","index":"L","keyword":"柳州LIUZHOULZ"},{"cityid":113,"parentid":7,"citycode":"101260801","city":"六盘水","index":"L","keyword":"六盘水LIUPANSHUILPS"},{"cityid":143,"parentid":9,"citycode":"101090601","city":"廊坊","index":"L","keyword":"廊坊LANGFANGLF"},{"cityid":149,"parentid":10,"citycode":"101180901","city":"洛阳","index":"L","keyword":"洛阳LUOYANGLY"},{"cityid":164,"parentid":10,"citycode":"101181501","city":"漯河","index":"L","keyword":"漯河LUOHELH"},{"cityid":202,"parentid":13,"citycode":"101250801","city":"娄底","index":"L","keyword":"娄底LOUDILD"},{"cityid":214,"parentid":14,"citycode":"101060701","city":"辽源","index":"L","keyword":"辽源LIAOYUANLY"},{"cityid":224,"parentid":15,"citycode":"101191001","city":"连云港","index":"L","keyword":"连云港LIANYUNGANGLYG"},{"cityid":289,"parentid":21,"citycode":"101121601","city":"莱芜","index":"L","keyword":"莱芜LAIWULW"},{"cityid":290,"parentid":21,"citycode":"101121701","city":"聊城","index":"L","keyword":"聊城LIAOCHENGLC"},{"cityid":291,"parentid":21,"citycode":"101120901","city":"临沂","index":"L","keyword":"临沂LINYILY"},{"cityid":304,"parentid":22,"citycode":"101100701","city":"临汾","index":"L","keyword":"临汾LINFENLF"},{"cityid":305,"parentid":22,"citycode":"101101100","city":"吕梁","index":"L","keyword":"吕梁LU:LIANGLL"},{"cityid":330,"parentid":25,"citycode":"101271401","city":"乐山","index":"L","keyword":"乐山LESHANLS"},{"cityid":341,"parentid":25,"citycode":"101271001","city":"泸州","index":"L","keyword":"泸州LUZHOULZ"},{"cityid":343,"parentid":27,"citycode":"101140101","city":"拉萨","index":"L","keyword":"拉萨LASALS"},{"cityid":369,"parentid":29,"citycode":"101291401","city":"丽江","index":"L","keyword":"丽江LIJIANGLJ"},{"cityid":376,"parentid":29,"citycode":"101291101","city":"临沧","index":"L","keyword":"临沧LINCANGLC"},{"cityid":386,"parentid":30,"citycode":"101210801","city":"丽水","index":"L","keyword":"丽水LISHUILS"},{"cityid":3239,"parentid":382,"citycode":"101210107","city":"临安市","index":"L","keyword":"临安市LINANSHILAS"},{"cityid":3256,"parentid":385,"citycode":"101210903","city":"兰溪市","index":"L","keyword":"兰溪市LANXISHILXS"},{"cityid":3269,"parentid":386,"citycode":"101210810","city":"莲都区","index":"L","keyword":"莲都区LIANDOUQULDQ"},{"cityid":3270,"parentid":386,"citycode":"101210803","city":"龙泉市","index":"L","keyword":"龙泉市LONGQUANSHILQS"},{"cityid":3297,"parentid":389,"citycode":"101210613","city":"路桥区","index":"L","keyword":"路桥区LUQIAOQULQQ"},{"cityid":3299,"parentid":389,"citycode":"101210610","city":"临海市","index":"L","keyword":"临海市LINHAISHILHS"},{"cityid":3304,"parentid":390,"citycode":"101210710","city":"鹿城区","index":"L","keyword":"鹿城区LUCHENGQULCQ"},{"cityid":3305,"parentid":390,"citycode":"101210711","city":"龙湾区","index":"L","keyword":"龙湾区LONGWANQULWQ"},{"cityid":3308,"parentid":390,"citycode":"101210707","city":"乐清市","index":"L","keyword":"乐清市LEQINGSHILQS"},{"cityid":3323,"parentid":392,"citycode":"101211004","city":"龙游县","index":"L","keyword":"龙游县LONGYOUXIANLYX"}]},{"name":"M","list":[{"cityid":45,"parentid":2,"citycode":"101220501","city":"马鞍山","index":"M","keyword":"马鞍山MAANSHANMAS"},{"cityid":84,"parentid":5,"citycode":"101282001","city":"茂名","index":"M","keyword":"茂名MAOMINGMM"},{"cityid":85,"parentid":5,"citycode":"101280401","city":"梅州","index":"M","keyword":"梅州MEIZHOUMZ"},{"cityid":173,"parentid":11,"citycode":"101050301","city":"牡丹江","index":"M","keyword":"牡丹江MUDANJIANGMDJ"},{"cityid":322,"parentid":25,"citycode":"101270401","city":"绵阳","index":"M","keyword":"绵阳MIANYANGMY"},{"cityid":332,"parentid":25,"citycode":"101271501","city":"眉山","index":"M","keyword":"眉山MEISHANMS"}]},{"name":"N","list":[{"cityid":54,"parentid":3,"citycode":"101230901","city":"南平","index":"N","keyword":"南平NANPINGNP"},{"cityid":55,"parentid":3,"citycode":"101230301","city":"宁德","index":"N","keyword":"宁德NINGDEND"},{"cityid":96,"parentid":6,"citycode":"101300101","city":"南宁","index":"N","keyword":"南宁NANNINGNN"},{"cityid":155,"parentid":10,"citycode":"101180701","city":"南阳","index":"N","keyword":"南阳NANYANGNY"},{"cityid":219,"parentid":15,"citycode":"101190101","city":"南京","index":"N","keyword":"南京NANJINGNJ"},{"cityid":225,"parentid":15,"citycode":"101190501","city":"南通","index":"N","keyword":"南通NANTONGNT"},{"cityid":333,"parentid":25,"citycode":"101270501","city":"南充","index":"N","keyword":"南充NANCHONGNC"},{"cityid":334,"parentid":25,"citycode":"101271201","city":"内江","index":"N","keyword":"内江NEIJIANGNJ"},{"cityid":387,"parentid":30,"citycode":"101210401","city":"宁波","index":"N","keyword":"宁波NINGBONB"},{"cityid":3243,"parentid":383,"citycode":"101210206","city":"南浔区","index":"N","keyword":"南浔区NANXUNQUNXQ"},{"cityid":3247,"parentid":384,"citycode":"101210307","city":"南湖区","index":"N","keyword":"南湖区NANHUQUNHQ"},{"cityid":3288,"parentid":387,"citycode":"101210408","city":"宁海县","index":"N","keyword":"宁海县NINGHAIXIANNHX"}]},{"name":"O","list":[{"cityid":3306,"parentid":390,"citycode":"101210712","city":"瓯海区","index":"O","keyword":"瓯海区OUHAIQUOHQ"}]},{"name":"P","list":[{"cityid":56,"parentid":3,"citycode":"101230401","city":"莆田","index":"P","keyword":"莆田PUTIANPT"},{"cityid":70,"parentid":4,"citycode":"101160301","city":"平凉","index":"P","keyword":"平凉PINGLIANGPL"},{"cityid":156,"parentid":10,"citycode":"101180501","city":"平顶山","index":"P","keyword":"平顶山PINGDINGSHANPDS"},{"cityid":238,"parentid":16,"citycode":"101240901","city":"萍乡","index":"P","keyword":"萍乡PINGXIANGPX"},{"cityid":254,"parentid":17,"citycode":"101071301","city":"盘锦","index":"P","keyword":"盘锦PANJINPJ"},{"cityid":335,"parentid":25,"citycode":"101270201","city":"攀枝花","index":"P","keyword":"攀枝花PANZHIHUAPZH"},{"cityid":3251,"parentid":384,"citycode":"101210305","city":"平湖市","index":"P","keyword":"平湖市PINGHUSHIPHS"},{"cityid":3267,"parentid":385,"citycode":"101210902","city":"浦江县","index":"P","keyword":"浦江县PUJIANGXIANPJX"},{"cityid":3268,"parentid":385,"citycode":"101210908","city":"磐安县","index":"P","keyword":"磐安县PANANXIANPAX"},{"cityid":3311,"parentid":390,"citycode":"101210704","city":"平阳县","index":"P","keyword":"平阳县PINGYANGXIANPYX"},{"cityid":3316,"parentid":391,"citycode":"101211105","city":"普陀区","index":"P","keyword":"普陀区PUTUOQUPTQ"}]},{"name":"Q","list":[{"cityid":57,"parentid":3,"citycode":"101230501","city":"泉州","index":"Q","keyword":"泉州QUANZHOUQZ"},{"cityid":71,"parentid":4,"citycode":"101160401","city":"庆阳","index":"Q","keyword":"庆阳QINGYANGQY"},{"cityid":86,"parentid":5,"citycode":"101281301","city":"清远","index":"Q","keyword":"清远QINGYUANQY"},{"cityid":107,"parentid":6,"citycode":"101301101","city":"钦州","index":"Q","keyword":"钦州QINZHOUQZ"},{"cityid":144,"parentid":9,"citycode":"101091101","city":"秦皇岛","index":"Q","keyword":"秦皇岛QINHUANGDAOQHD"},{"cityid":174,"parentid":11,"citycode":"101051002","city":"七台河","index":"Q","keyword":"七台河QITAIHEQTH"},{"cityid":175,"parentid":11,"citycode":"101050201","city":"齐齐哈尔","index":"Q","keyword":"齐齐哈尔QIQIHAERQQHE"},{"cityid":283,"parentid":21,"citycode":"101120201","city":"青岛","index":"Q","keyword":"青岛QINGDAOQD"},{"cityid":377,"parentid":29,"citycode":"101290401","city":"曲靖","index":"Q","keyword":"曲靖QUJINGQJ"},{"cityid":392,"parentid":30,"citycode":"101211001","city":"衢州","index":"Q","keyword":"衢州QUZHOUQZ"},{"cityid":3271,"parentid":386,"citycode":"101210805","city":"青田县","index":"Q","keyword":"青田县QINGTIANXIANQTX"},{"cityid":3276,"parentid":386,"citycode":"101210807","city":"庆元县","index":"Q","keyword":"庆元县QINGYUANXIANQYX"},{"cityid":3319,"parentid":392,"citycode":"101211006","city":"衢江区","index":"Q","keyword":"衢江区QUJIANGQUQJQ"}]},{"name":"R","list":[{"cityid":292,"parentid":21,"citycode":"101121501","city":"日照","index":"R","keyword":"日照RIZHAORZ"},{"cityid":3307,"parentid":390,"citycode":"101210705","city":"瑞安市","index":"R","keyword":"瑞安市RUIANSHIRAS"}]},{"name":"S","list":[{"cityid":24,"parentid":0,"citycode":"101020100","city":"上海","index":"S","keyword":"上海SHANGHAISH"},{"cityid":46,"parentid":2,"citycode":"101220701","city":"宿州","index":"S","keyword":"宿州SUZHOUSZ"},{"cityid":58,"parentid":3,"citycode":"101230801","city":"三明","index":"S","keyword":"三明SANMINGSM"},{"cityid":59,"parentid":3,"citycode":"101230201","city":"厦门","index":"S","keyword":"厦门SHAMENSM"},{"cityid":76,"parentid":5,"citycode":"101280601","city":"深圳","index":"S","keyword":"深圳SHENZHENSZ"},{"cityid":87,"parentid":5,"citycode":"101280501","city":"汕头","index":"S","keyword":"汕头SHANTOUST"},{"cityid":88,"parentid":5,"citycode":"101282101","city":"汕尾","index":"S","keyword":"汕尾SHANWEISW"},{"cityid":89,"parentid":5,"citycode":"101280201","city":"韶关","index":"S","keyword":"韶关SHAOGUANSG"},{"cityid":120,"parentid":8,"citycode":"101310201","city":"三亚","index":"S","keyword":"三亚SANYASY"},{"cityid":137,"parentid":9,"citycode":"101090101","city":"石家庄","index":"S","keyword":"石家庄SHIJIAZHUANGSJZ"},{"cityid":157,"parentid":10,"citycode":"101181701","city":"三门峡","index":"S","keyword":"三门峡SANMENXIASMX"},{"cityid":158,"parentid":10,"citycode":"101181001","city":"商丘","index":"S","keyword":"商丘SHANGQIUSQ"},{"cityid":176,"parentid":11,"citycode":"101051301","city":"双鸭山","index":"S","keyword":"双鸭山SHUANGYASHANSYS"},{"cityid":177,"parentid":11,"citycode":"101050501","city":"绥化","index":"S","keyword":"绥化SUIHUASH"},{"cityid":188,"parentid":12,"citycode":"101201101","city":"十堰","index":"S","keyword":"十堰SHIYANSY"},{"cityid":189,"parentid":12,"citycode":"101201301","city":"随州","index":"S","keyword":"随州SUIZHOUSZ"},{"cityid":215,"parentid":14,"citycode":"101060401","city":"四平","index":"S","keyword":"四平SIPINGSP"},{"cityid":216,"parentid":14,"citycode":"101060801","city":"松原","index":"S","keyword":"松原SONGYUANSY"},{"cityid":220,"parentid":15,"citycode":"101190401","city":"苏州","index":"S","keyword":"苏州SUZHOUSZ"},{"cityid":226,"parentid":15,"citycode":"101191301","city":"宿迁","index":"S","keyword":"宿迁SUQIANSQ"},{"cityid":243,"parentid":17,"citycode":"101070101","city":"沈阳","index":"S","keyword":"沈阳SHENYANGSY"},{"cityid":271,"parentid":19,"citycode":"101170201","city":"石嘴山","index":"S","keyword":"石嘴山SHIZUISHANSZS"},{"cityid":306,"parentid":22,"citycode":"101100901","city":"朔州","index":"S","keyword":"朔州SHUOZHOUSZ"},{"cityid":314,"parentid":23,"citycode":"101110601","city":"商洛","index":"S","keyword":"商洛SHANGLUOSL"},{"cityid":336,"parentid":25,"citycode":"101270701","city":"遂宁","index":"S","keyword":"遂宁SUININGSN"},{"cityid":3229,"parentid":382,"citycode":"101210109","city":"上城区","index":"S","keyword":"上城区SHANGCHENGQUSCQ"},{"cityid":3273,"parentid":386,"citycode":"101210802","city":"遂昌县","index":"S","keyword":"遂昌县SUICHANGXIANSCX"},{"cityid":3274,"parentid":386,"citycode":"101210808","city":"松阳县","index":"S","keyword":"松阳县SONGYANGXIANSYX"},{"cityid":3290,"parentid":388,"citycode":"101210503","city":"上虞区","index":"S","keyword":"上虞区SHANGYUQUSYQ"},{"cityid":3291,"parentid":388,"citycode":"101210505","city":"嵊州市","index":"S","keyword":"嵊州市SHENGZHOUSHISZS"},{"cityid":3292,"parentid":388,"citycode":"101210501","city":"绍兴县","index":"S","keyword":"绍兴县SHAOXINGXIANSXX"},{"cityid":3301,"parentid":389,"citycode":"101210604","city":"三门县","index":"S","keyword":"三门县SANMENXIANSMX"},{"cityid":3318,"parentid":391,"citycode":"101211102","city":"嵊泗县","index":"S","keyword":"嵊泗县SHENGSIXIANSSX"}]},{"name":"T","list":[{"cityid":26,"parentid":0,"citycode":"101030100","city":"天津","index":"T","keyword":"天津TIANJINTJ"},{"cityid":47,"parentid":2,"citycode":"101221301","city":"铜陵","index":"T","keyword":"铜陵TONGLINGTL"},{"cityid":72,"parentid":4,"citycode":"101160901","city":"天水","index":"T","keyword":"天水TIANSHUITS"},{"cityid":145,"parentid":9,"citycode":"101090501","city":"唐山","index":"T","keyword":"唐山TANGSHANTS"},{"cityid":217,"parentid":14,"citycode":"101060501","city":"通化","index":"T","keyword":"通化TONGHUATH"},{"cityid":227,"parentid":15,"citycode":"101191201","city":"泰州","index":"T","keyword":"泰州TAIZHOUTZ"},{"cityid":264,"parentid":18,"citycode":"101080501","city":"通辽","index":"T","keyword":"通辽TONGLIAOTL"},{"cityid":293,"parentid":21,"citycode":"101120801","city":"泰安","index":"T","keyword":"泰安TAIANTA"},{"cityid":299,"parentid":22,"citycode":"101100101","city":"太原","index":"T","keyword":"太原TAIYUANTY"},{"cityid":315,"parentid":23,"citycode":"101111001","city":"铜川","index":"T","keyword":"铜川TONGCHUANTC"},{"cityid":389,"parentid":30,"citycode":"101210601","city":"台州","index":"T","keyword":"台州TAIZHOUTZ"},{"cityid":3240,"parentid":382,"citycode":"101210103","city":"桐庐县","index":"T","keyword":"桐庐县TONGLUXIANTLX"},{"cityid":3252,"parentid":384,"citycode":"101210304","city":"桐乡市","index":"T","keyword":"桐乡市TONGXIANGSHITXS"},{"cityid":3302,"parentid":389,"citycode":"101210605","city":"天台县","index":"T","keyword":"天台县TIANTAIXIANTTX"},{"cityid":3314,"parentid":390,"citycode":"101210702","city":"泰顺县","index":"T","keyword":"泰顺县TAISHUNXIANTSX"}]},{"name":"W","list":[{"cityid":48,"parentid":2,"citycode":"101220301","city":"芜湖","index":"W","keyword":"芜湖WUHUWH"},{"cityid":73,"parentid":4,"citycode":"101160501","city":"武威","index":"W","keyword":"武威WUWEIWW"},{"cityid":108,"parentid":6,"citycode":"101300601","city":"梧州","index":"W","keyword":"梧州WUZHOUWZ"},{"cityid":179,"parentid":12,"citycode":"101200101","city":"武汉","index":"W","keyword":"武汉WUHANWH"},{"cityid":221,"parentid":15,"citycode":"101190201","city":"无锡","index":"W","keyword":"无锡WUXIWX"},{"cityid":265,"parentid":18,"citycode":"101080301","city":"乌海","index":"W","keyword":"乌海WUHAIWH"},{"cityid":272,"parentid":19,"citycode":"101170301","city":"吴忠","index":"W","keyword":"吴忠WUZHONGWZ"},{"cityid":294,"parentid":21,"citycode":"101121301","city":"威海","index":"W","keyword":"威海WEIHAIWH"},{"cityid":295,"parentid":21,"citycode":"101120601","city":"潍坊","index":"W","keyword":"潍坊WEIFANGWF"},{"cityid":316,"parentid":23,"citycode":"101110501","city":"渭南","index":"W","keyword":"渭南WEINANWN"},{"cityid":350,"parentid":28,"citycode":"101130101","city":"乌鲁木齐","index":"W","keyword":"乌鲁木齐WULUMUQIWLMQ"},{"cityid":390,"parentid":30,"citycode":"101210701","city":"温州","index":"W","keyword":"温州WENZHOUWZ"},{"cityid":3242,"parentid":383,"citycode":"101210205","city":"吴兴区","index":"W","keyword":"吴兴区WUXINGQUWXQ"},{"cityid":3254,"parentid":385,"citycode":"101210909","city":"婺城区","index":"W","keyword":"婺城区WUCHENGQUWCQ"},{"cityid":3266,"parentid":385,"citycode":"101210906","city":"武义县","index":"W","keyword":"武义县WUYIXIANWYX"},{"cityid":3298,"parentid":389,"citycode":"101210607","city":"温岭市","index":"W","keyword":"温岭市WENLINGSHIWLS"},{"cityid":3313,"parentid":390,"citycode":"101210703","city":"文成县","index":"W","keyword":"文成县WENCHENGXIANWCX"}]},{"name":"X","list":[{"cityid":32,"parentid":0,"citycode":"101320101","city":"香港","index":"X","keyword":"香港XIANGGANGXG"},{"cityid":49,"parentid":2,"citycode":"101221401","city":"宣城","index":"X","keyword":"宣城XUANCHENGXC"},{"cityid":160,"parentid":10,"citycode":"101180601","city":"信阳","index":"X","keyword":"信阳XINYANGXY"},{"cityid":191,"parentid":12,"citycode":"101200701","city":"咸宁","index":"X","keyword":"咸宁XIANNINGXN"},{"cityid":193,"parentid":12,"citycode":"101200401","city":"孝感","index":"X","keyword":"孝感XIAOGANXG"},{"cityid":228,"parentid":15,"citycode":"101190801","city":"徐州","index":"X","keyword":"徐州XUZHOUXZ"},{"cityid":240,"parentid":16,"citycode":"101241001","city":"新余","index":"X","keyword":"新余XINYUXY"},{"cityid":274,"parentid":20,"citycode":"101150101","city":"西宁","index":"X","keyword":"西宁XININGXN"},{"cityid":307,"parentid":22,"citycode":"101101001","city":"忻州","index":"X","keyword":"忻州XINZHOUXZ"},{"cityid":310,"parentid":23,"citycode":"101110101","city":"西安","index":"X","keyword":"西安XIANXA"},{"cityid":317,"parentid":23,"citycode":"101110200","city":"咸阳","index":"X","keyword":"咸阳XIANYANGXY"},{"cityid":3228,"parentid":382,"citycode":"101210113","city":"西湖区","index":"X","keyword":"西湖区XIHUQUXHQ"},{"cityid":3230,"parentid":382,"citycode":"101210110","city":"下城区","index":"X","keyword":"下城区XIACHENGQUXCQ"},{"cityid":3234,"parentid":382,"citycode":"101210102","city":"萧山区","index":"X","keyword":"萧山区XIAOSHANQUXSQ"},{"cityid":3248,"parentid":384,"citycode":"101210308","city":"秀洲区","index":"X","keyword":"秀洲区XIUZHOUQUXZQ"},{"cityid":3287,"parentid":387,"citycode":"101210406","city":"象山县","index":"X","keyword":"象山县XIANGSHANXIANXSX"},{"cityid":3293,"parentid":388,"citycode":"101210504","city":"新昌县","index":"X","keyword":"新昌县XINCHANGXIANXCX"},{"cityid":3303,"parentid":389,"citycode":"101210606","city":"仙居县","index":"X","keyword":"仙居县XIANJUXIANXJX"}]},{"name":"Y","list":[{"cityid":90,"parentid":5,"citycode":"101281801","city":"阳江","index":"Y","keyword":"阳江YANGJIANGYJ"},{"cityid":91,"parentid":5,"citycode":"101281401","city":"云浮","index":"Y","keyword":"云浮YUNFUYF"},{"cityid":109,"parentid":6,"citycode":"101300901","city":"玉林","index":"Y","keyword":"玉林YULINYL"},{"cityid":194,"parentid":12,"citycode":"101200901","city":"宜昌","index":"Y","keyword":"宜昌YICHANGYC"},{"cityid":206,"parentid":13,"citycode":"101250700","city":"益阳","index":"Y","keyword":"益阳YIYANGYY"},{"cityid":207,"parentid":13,"citycode":"101251401","city":"永州","index":"Y","keyword":"永州YONGZHOUYZ"},{"cityid":229,"parentid":15,"citycode":"101190701","city":"盐城","index":"Y","keyword":"盐城YANCHENGYC"},{"cityid":230,"parentid":15,"citycode":"101190601","city":"扬州","index":"Y","keyword":"扬州YANGZHOUYZ"},{"cityid":241,"parentid":16,"citycode":"101240501","city":"宜春","index":"Y","keyword":"宜春YICHUNYC"},{"cityid":242,"parentid":16,"citycode":"101241101","city":"鹰潭","index":"Y","keyword":"鹰潭YINGTANYT"},{"cityid":256,"parentid":17,"citycode":"101070801","city":"营口","index":"Y","keyword":"营口YINGKOUYK"},{"cityid":269,"parentid":19,"citycode":"101170101","city":"银川","index":"Y","keyword":"银川YINCHUANYC"},{"cityid":296,"parentid":21,"citycode":"101120501","city":"烟台","index":"Y","keyword":"烟台YANTAIYT"},{"cityid":308,"parentid":22,"citycode":"101100301","city":"阳泉","index":"Y","keyword":"阳泉YANGQUANYQ"},{"cityid":309,"parentid":22,"citycode":"101100801","city":"运城","index":"Y","keyword":"运城YUNCHENGYC"},{"cityid":318,"parentid":23,"citycode":"101110300","city":"延安","index":"Y","keyword":"延安YANANYA"},{"cityid":319,"parentid":23,"citycode":"101110401","city":"榆林","index":"Y","keyword":"榆林YULINYL"},{"cityid":337,"parentid":25,"citycode":"101271701","city":"雅安","index":"Y","keyword":"雅安YAANYA"},{"cityid":338,"parentid":25,"citycode":"101271101","city":"宜宾","index":"Y","keyword":"宜宾YIBINYB"},{"cityid":380,"parentid":29,"citycode":"101290701","city":"玉溪","index":"Y","keyword":"玉溪YUXIYX"},{"cityid":3235,"parentid":382,"citycode":"101210106","city":"余杭区","index":"Y","keyword":"余杭区YUHANGQUYHQ"},{"cityid":3257,"parentid":385,"citycode":"101210904","city":"义乌市","index":"Y","keyword":"义乌市YIWUSHIYWS"},{"cityid":3265,"parentid":385,"citycode":"101210907","city":"永康市","index":"Y","keyword":"永康市YONGKANGSHIYKS"},{"cityid":3275,"parentid":386,"citycode":"101210806","city":"云和县","index":"Y","keyword":"云和县YUNHEXIANYHX"},{"cityid":3283,"parentid":387,"citycode":"101210411","city":"鄞州区","index":"Y","keyword":"鄞州区YINZHOUQUYZQ"},{"cityid":3284,"parentid":387,"citycode":"101210404","city":"余姚市","index":"Y","keyword":"余姚市YUYAOSHIYYS"},{"cityid":3289,"parentid":388,"citycode":"101210501","city":"越城区","index":"Y","keyword":"越城区YUECHENGQUYCQ"},{"cityid":3300,"parentid":389,"citycode":"101210603","city":"玉环县","index":"Y","keyword":"玉环县YUHUANXIANYHX"},{"cityid":3310,"parentid":390,"citycode":"101210708","city":"永嘉县","index":"Y","keyword":"永嘉县YONGJIAXIANYJX"}]},{"name":"Z","list":[{"cityid":31,"parentid":0,"citycode":"101040100","city":"重庆","index":"Z","keyword":"重庆ZHONGQINGZQ"},{"cityid":60,"parentid":3,"citycode":"101230601","city":"漳州","index":"Z","keyword":"漳州ZHANGZHOUZZ"},{"cityid":74,"parentid":4,"citycode":"101160701","city":"张掖","index":"Z","keyword":"张掖ZHANGYEZY"},{"cityid":92,"parentid":5,"citycode":"101281001","city":"湛江","index":"Z","keyword":"湛江ZHANJIANGZJ"},{"cityid":93,"parentid":5,"citycode":"101280901","city":"肇庆","index":"Z","keyword":"肇庆ZHAOQINGZQ"},{"cityid":94,"parentid":5,"citycode":"101281701","city":"中山","index":"Z","keyword":"中山ZHONGSHANZS"},{"cityid":95,"parentid":5,"citycode":"101280701","city":"珠海","index":"Z","keyword":"珠海ZHUHAIZH"},{"cityid":118,"parentid":7,"citycode":"101260201","city":"遵义","index":"Z","keyword":"遵义ZUNYIZY"},{"cityid":147,"parentid":9,"citycode":"101090301","city":"张家口","index":"Z","keyword":"张家口ZHANGJIAKOUZJK"},{"cityid":148,"parentid":10,"citycode":"101180101","city":"郑州","index":"Z","keyword":"郑州ZHENGZHOUZZ"},{"cityid":162,"parentid":10,"citycode":"101181401","city":"周口","index":"Z","keyword":"周口ZHOUKOUZK"},{"cityid":163,"parentid":10,"citycode":"101181601","city":"驻马店","index":"Z","keyword":"驻马店ZHUMADIANZMD"},{"cityid":197,"parentid":13,"citycode":"101251101","city":"张家界","index":"Z","keyword":"张家界ZHANGJIAJIEZJJ"},{"cityid":210,"parentid":14,"citycode":"101060101","city":"长春","index":"Z","keyword":"长春ZHANGCHUNZC"},{"cityid":231,"parentid":15,"citycode":"101190301","city":"镇江","index":"Z","keyword":"镇江ZHENJIANGZJ"},{"cityid":273,"parentid":19,"citycode":"101170501","city":"中卫","index":"Z","keyword":"中卫ZHONGWEIZW"},{"cityid":297,"parentid":21,"citycode":"101121401","city":"枣庄","index":"Z","keyword":"枣庄ZAOZHUANGZZ"},{"cityid":298,"parentid":21,"citycode":"101120301","city":"淄博","index":"Z","keyword":"淄博ZIBOZB"},{"cityid":339,"parentid":25,"citycode":"101271301","city":"资阳","index":"Z","keyword":"资阳ZIYANGZY"},{"cityid":340,"parentid":25,"citycode":"101270301","city":"自贡","index":"Z","keyword":"自贡ZIGONGZG"},{"cityid":381,"parentid":29,"citycode":"101291001","city":"昭通","index":"Z","keyword":"昭通ZHAOTONGZT"},{"cityid":391,"parentid":30,"citycode":"101211101","city":"舟山","index":"Z","keyword":"舟山ZHOUSHANZS"},{"cityid":3245,"parentid":383,"citycode":"101210202","city":"长兴县","index":"Z","keyword":"长兴县ZHANGXINGXIANZXX"},{"cityid":3281,"parentid":387,"citycode":"101210412","city":"镇海区","index":"Z","keyword":"镇海区ZHENHAIQUZHQ"},{"cityid":3294,"parentid":388,"citycode":"101210502","city":"诸暨市","index":"Z","keyword":"诸暨市ZHUJISHIZJS"}]}],
			hotCity: ['北京', '上海', '广州', '深圳', '杭州', '合肥', '武汉', '厦门', '西安', '昆明', '成都', '重庆','湖州','长兴'], // 热门城市
			listCur: null,
			inputVal: '', // 搜索框输入的内容
			isSearch:false,
			searchResult: [], // 搜索城市的结果
		};
	},
	computed: {
		...weatherGetters(['cityList'])
	},
	onLoad() {
		this.listCur = this.list[0];
	},
	onReady() {
		let that = this;
		setTimeout(() =>{
			uni.createSelectorQuery()
				.select('.indexBar-box')
				.boundingClientRect(function(res) {
					that.boxTop = res.top;
				})
				.exec();
			uni.createSelectorQuery()
				.select('.indexes')
				.boundingClientRect(function(res) {
					that.barTop = res.top;
				})
				.exec();
		}, 100);
	},
	methods: {
		...weatherActions(['addCityList']),
		link(x,y){
			let obj = this.list[x].list[y];
			this.addCity(obj);
		},
		hotLink(name){
			let flag = true;
			let obj = null;
			this.list.forEach((item1, index1) => {
				item1.list.forEach((item2, index2) => {
					if (item2.city.indexOf(name) !== -1) {
						if(flag){
							flag = false;
							obj = item2;
						}
					}
				})
			})
			if(obj != null){
				this.addCity(obj);
			}else{
				this.$msg('没有找到对应城市天气抱歉');
			}
		},
		searchLink(i){
			let obj = this.searchResult[i];
			this.addCity(obj);
		},
		async addCity(obj){
			let flag = false;
			this.cityList.forEach(temp => {
				if (temp.cityid == obj.cityid) flag = true;
			});
			if(flag){
				this.$msg('已经添加该城市');
			}else{
				this.$showLoading();
				let cityList = await this.addCityList(obj);
				this.$storage.set('cityList', cityList);
				this.$hideLoading();
				this.navigateBack();
			}
		},
		//获取文字信息
		getCur(e) {
			this.hidden = false;
			this.listCur = this.list[e.target.id].name;
		},
		setCur(e) {
			this.hidden = true;
			this.listCur = this.listCur;
		},
		//滑动选择Item
		tMove(e) {
			let y = e.touches[0].clientY,
				offsettop = this.boxTop,
				that = this;
			//判断选择区域,只有在选择区才会生效
			if (y > offsettop) {
				let num = parseInt((y - offsettop) / 20);
				this.listCur = that.list[num].name;
				this.listCurID = this.listCur;
			}
		},

		//触发全部开始选择
		tStart() {
			this.hidden = false;
		},

		//触发结束选择
		tEnd() {
			this.hidden = true;
			this.listCurID = this.listCur;
		},
		indexSelect(e) {
			let that = this;
			let barHeight = this.barHeight;
			let list = this.list;
			let scrollY = Math.ceil((list.length * e.detail.y) / barHeight);
			for (let i = 0; i < list.length; i++) {
				if (scrollY < i + 1) {
					that.listCur = list[i].name;
					that.movableY = i * 20;
					return false;
				}
			}
		},
		inputChange(e){
			this.inputVal = e.target.value;
			if(!this.inputVal){
				this.isSearch = false;
			}else{
				this.isSearch = true;
				this.searchCity();
			}
		},
		// 搜索城市
		searchCity() {
			let result = []
			this.list.forEach((item1, index1) => {
				item1.list.forEach((item2, index2) => {
					if (item2.keyword.indexOf(this.inputVal.toLocaleUpperCase()) !== -1) {
						result.push(item2)
					}
				})
			})
			this.searchResult = result
		},
	}
};
</script>

<style lang="scss">
page {
	padding-top: 100rpx;
}
.weather-city-main{
	.m-city{
		&:active{
			background: #eee;
			color: #333;
			opacity: .7;
		}
	}
	
	.indexes {
		position: relative;
	}
	
	.indexBar {
		position: fixed;
		right: 0px;
		bottom: 0px;
		padding: 20rpx 20rpx 20rpx 60rpx;
		display: flex;
		align-items: center;
	}
	
	.indexBar .indexBar-box {
		width: 50rpx;
		padding: 5rpx;
		padding-bottom: 15rpx;
		height: auto;
		background: #fff;
		display: flex;
		flex-direction: column;
		box-shadow: 0 0 20rpx rgba(0, 0, 0, 0.1);
		border-radius: 30rpx;
	}
	
	.indexBar-item {
		flex: 1;
		width: 40rpx;
		padding-top: 10rpx;
		height: 40rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24rpx;
		color: #888;
	}
	
	movable-view.indexBar-item {
		width: 40rpx;
		height: 40rpx;
		z-index: 9;
		position: relative;
	}
	
	movable-view.indexBar-item::before {
		content: '';
		display: block;
		position: absolute;
		left: 0;
		top: 10rpx;
		height: 20rpx;
		width: 4rpx;
		background-color: #f37b1d;
	}
	
	.indexToast {
		position: fixed;
		top: 0;
		right: 90rpx;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		width: 100rpx;
		height: 100rpx;
		border-radius: 10rpx;
		margin: auto;
		color: #fff;
		line-height: 100rpx;
		text-align: center;
		font-size: 48rpx;
	}
	.m-input input.uni-input-input {
		height: 30px;
	}
}

</style>

import Controller, { VERB } from "../core/Controller";
import {
    ImportRequestModel,
    OffersModel
} from "../models";
import { EXPORT_URL } from "../constants/urls";
import Error from "../core/Error";
import { YMLConverter } from "../helpers/yandexMarketHelper";


class ExportController extends Controller {

    get routes() {
        return [
            {
                route: `${EXPORT_URL}/yandex-market`,
                verb: VERB.POST,
                handler: this.ExportToYandexMarket
            }
        ]
    }


    /**
     * @api {post} /export/yandex-market exportAsYandexMarket
     * @apiGroup Export
     * @apiVersion 1.0.0
     *
     * @apiParam {String} importRequestId
     * @apiParam {Array} offersIds
     *
     * @apiHeader {String} Content-Type=application/json
     * @apiHeader {String} Authorization Bearer JWT
     *
     * @apiParamExample {json} Request-Example:
     * {
     *      "importRequestId":"5e3d5113669ecc3dcd489823",
     *      "offersIds":[
     *          "5e3e931423e2900e0422a96e",
     *          "5e3e931423e2900e0422a96f"
     *      ]
     * }
     *
     * @apiSuccessExample {xml} Success-Response:
     * HTTP/1.1 200 OK
     * <?xml version="1.0" encoding="UTF-8"?>
     *     <yml_catalog date="2020-02-10 11:55">
     *         <shop>
     *             <name>7@test.com</name>
     *             <company>0678106485</company>
     *             <url>https://www.olx.ua/list/user/5rd2K/</url>
     *             <currencies>
     *                 <currency id="USD" rate="СВ"/>
     *                 <currency id="UAH" rate="1"/>
     *                 <currency id="EUR" rate="СВ"/>
     *                 </currencies>
     *                 <delivery-options/>
     *                 <categories>
     *                     <category id="1">Объявление Узин</category>
     *                     <category id="2" parentId="1">Электроника Узин</category>
     *                     <category id="3" parentId="2">Аудиотехника Узин</category>
     *                     <category id="4" parentId="3">Акустические системы Узин</category>
     *                     <category id="5" parentId="3">Магнитолы Узин</category>
     *                 </categories>
     *                 <offers>
     *                     <offer id="5e3e931423e2900e0422" available="true">
     *                          <url>https://www.olx.ua/obyavlenie/akustika-rft-IDGYNeE.html?sd=1#dcfb000ef3</url>
     *                          <price>2800</price>
     *                          <currencyId>UAH</currencyId>
     *                          <categoryId>4</categoryId>
     *                          <name>Aкустика RFT</name>
     *                          <description>
     *                              <![CDATA[Акустика RFT. Полностью рабочая. В очень хорошем состоянии. Позже добавлю описание.]]>
     *                          </description>
     *                          <param name="Объявление от">Бизнес</param>
     *                          <param name="Вид аудиотехники">Акустические системы</param>
     *                          <param name="Состояние">Б/у</param>
     *                          <picture>http://192.168.50.110/5e3d5113669ecc3dcd489823/akustika-rft-IDGYNeE/0.jpg</picture>
     *                          <picture>http://192.168.50.110/5e3d5113669ecc3dcd489823/akustika-rft-IDGYNeE/1.jpg</picture>
     *                          <picture>http://192.168.50.110/5e3d5113669ecc3dcd489823/akustika-rft-IDGYNeE/2.jpg</picture>
     *                          <picture>http://192.168.50.110/5e3d5113669ecc3dcd489823/akustika-rft-IDGYNeE/3.jpg</picture>
     *                          <picture>http://192.168.50.110/5e3d5113669ecc3dcd489823/akustika-rft-IDGYNeE/4.jpg</picture>
     *                          <picture>http://192.168.50.110/5e3d5113669ecc3dcd489823/akustika-rft-IDGYNeE/5.jpg</picture>
     *                          <picture>http://192.168.50.110/5e3d5113669ecc3dcd489823/akustika-rft-IDGYNeE/6.jpg</picture>
     *                   </offer>
     *                   <offer id="5e3e931423e2900e0422" available="true">
     *                       <url>https://www.olx.ua/obyavlenie/bobinnyy-magnitofon-dokorder-1140-19-38-skorost-IDGYMWs.html#dcfb000ef3;promoted</url>
     *                       <price>3900</price>
     *                       <currencyId>USD</currencyId>
     *                       <categoryId>5</categoryId>
     *                       <name>Бобинный магнитофон Dokorder 1140 (19, 38 скорость)</name>
     *                       <description>
     *                           <![CDATA[Топовая модель от фирмы Denki  Onkyo. Состояние головок как новые. Полностью рабочий аппарат в идеальном состоянии. В Гугле очень много информации о данной модели. По записи и воспроизведении многим моделям с более высоким ценником даст фору.]]>
     *                       </description>
     *                       <param name="Объявление от">Бизнес</param>
     *                       <param name="Вид аудиотехники">Магнитолы</param>
     *                       <param name="Состояние">Б/у</param>
     *                       <picture>http://192.168.50.110/5e3d5113669ecc3dcd489823/bobinnyy-magnitofon-dokorder-1140-19-38-skorost-IDGYMWs/0.jpg</picture>
     *                       <picture>http://192.168.50.110/5e3d5113669ecc3dcd489823/bobinnyy-magnitofon-dokorder-1140-19-38-skorost-IDGYMWs/1.jpg</picture>
     *                       <picture>http://192.168.50.110/5e3d5113669ecc3dcd489823/bobinnyy-magnitofon-dokorder-1140-19-38-skorost-IDGYMWs/2.jpg</picture>
     *                       <picture>http://192.168.50.110/5e3d5113669ecc3dcd489823/bobinnyy-magnitofon-dokorder-1140-19-38-skorost-IDGYMWs/3.jpg</picture>
     *                       <picture>http://192.168.50.110/5e3d5113669ecc3dcd489823/bobinnyy-magnitofon-dokorder-1140-19-38-skorost-IDGYMWs/4.jpg</picture>
     *                       <picture>http://192.168.50.110/5e3d5113669ecc3dcd489823/bobinnyy-magnitofon-dokorder-1140-19-38-skorost-IDGYMWs/5.jpg</picture>
     *                       <picture>http://192.168.50.110/5e3d5113669ecc3dcd489823/bobinnyy-magnitofon-dokorder-1140-19-38-skorost-IDGYMWs/6.jpg</picture>
     *                       <picture>http://192.168.50.110/5e3d5113669ecc3dcd489823/bobinnyy-magnitofon-dokorder-1140-19-38-skorost-IDGYMWs/7.jpg</picture>
     *                   </offer>
     *               </offers>
     *           </shop>
     * </yml_catalog>
     *
     * @apiErrorExample {json} Error-Response:
     * HTTP/1.1 400 Bad Request
     * {
     *     "message": "Invalid token",
     *     "user": false
     * }
     *
     * @apiErrorExample {json} Error-Response:
     * HTTP/1.1 500 Internal Server Error
     * {
     *     "status": 500,
     *     "errors": "Invalid params"
     * }
     */
    async ExportToYandexMarket(req, res, next) {
        const {
            importRequestId,
            offersIds
        } = req.body;

        const importRequest = await ImportRequestModel
            .findById(importRequestId)
            .exec();

        if(!importRequest) {
            return next(new Error("Not found", 404));
        }

        let offers;

        if(offersIds.length === 0) {
            offers = await OffersModel
                .find({ importRequestId })
                .exec();
        } else {
            offers = await OffersModel
                .find({ importRequestId })
                .where('_id')
                .in(offersIds)
                .exec();
        }

        let YML;
        try {
            YML = YMLConverter(importRequest, offers);
        } catch (e) {
            console.log(e);
            return next(new Error("Something was wrong during YML generation.", 500));
        }

        res.set('Content-Type', 'text/xml');
        res.send(YML);
    }
}

export default new ExportController();

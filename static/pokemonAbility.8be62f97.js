const e={name:"茂盛",effect:"（HP小於1/3時，草系招式威力x1.5）"},t={name:"猛火",effect:"（HP小於1/3時，火系招式威力x1.5）"},n={name:"激流",effect:"（HP小於1/3時，水系招式威力x1.5）"},f={name:"蟲之預感",effect:"（HP小於1/3時，蟲系招式威力x1.5）"},a={name:"變幻自如",effect:"（自身屬性變為所選招式屬性，獲得屬修加成）"},c={name:"監視",effect:"（對當回來替換上來的寶可夢造成2倍傷害）"},o={name:"適應力",effect:"（屬修威力變為2倍，同屬太晶化時則變成2.25倍）"},m={name:"技術高手",effect:"（招式威力在60以下時，威力x1.5）"},r={name:"活力",effect:"（攻擊能力x1.5，但物理招式命中x0.8）"},s={name:"鋒銳",effect:"（使出切割類招式時，威力x1.5）"},i={name:"電晶體",effect:"（電系招式威力x1.3）"},x={name:"鬥爭心-同性",effect:"（對手與自身為同性時，威力x1.25）"},l={name:"捨身",effect:"（使用具反作用力的招式時，威力x1.2）"},u={name:"毅力",effect:"（陷入異常狀態時，攻擊能力x1.5）"},P={name:"電力轉換",effect:"（受到招式傷害時，進入充電狀態）"},S={name:"妖精皮膚",effect:"（一般系招式變成妖精屬性，且威力x1.2）"},p={name:"電氣皮膚",effect:"（一般系招式變成電屬性，且威力x1.2）"},y={name:"分析",effect:"（當回合最後一個使出招式時，威力x1.3）"},h={name:"狙擊手",effect:"（要害時的傷害變成2.25倍）"},H={name:"古代活性",effect:"（攜帶驅勁能量或大晴天下，HP外最高能力x1.3;若為速度則x1.5）"},d={name:"過濾",effect:"（受到效果絕佳招式的傷害x0.75）"},v={name:"耐熱",effect:"（受到火系招式及燒傷的傷害減半）"},k={name:"多重鱗片",effect:"（HP全滿時，受到的招式傷害減半）"},w={Overgrow:e,Blaze:t,Torrent:n,Swarm:f,Protean:a,Stakeout:c,"Tinted Lens":{name:"有色眼鏡",effect:"（使出招式效果不好時，招式威力x2）"},"Iron Fist":{name:"鐵拳",effect:"（使出拳頭類招式時，威力x1.2）"},"Flash Fire":{name:"引火",effect:"（受火系招式擊中後，使出火系招式時攻擊/特攻x1.5）"},"Strong Jaw":{name:"強壯之顎",effect:"（使出啃咬類招式時，威力x1.5）"},Adaptability:o,"Solar Power":{name:"太陽之力",effect:"（大晴天下特攻變成1.5倍，每回合損失最大HP的1/8）"},Technician:m,Hustle:r,"Huge Power":{name:"大力士",effect:"（攻擊提升為2倍）"},"Pure Power":{name:"瑜伽之力",effect:"（攻擊提升為2倍）"},"Water Bubble":{name:"水泡",effect:"（水屬性招式威力x2，受火屬招式威力減半）"},Sharpness:s,"Tough Claws":{name:"硬爪",effect:"（使出接觸類招式時，威力x1.3）"},Transistor:i,"Dragons Maw":{name:"龍顎",effect:"（龍系招式威力x1.5）"},Rivalry:x,"Rivalry-opposite":{name:"鬥爭心-異性",effect:"（對手與自身為異性時，威力x0.75）"},Reckless:l,"Plus Minus":{name:"正電/負電",effect:"（隊友特性為正電或負電時，特攻能力x1.5）"},Guts:u,"Sheer Force":{name:"強行",effect:"（附帶追加效果的招式威力x1.3，不再發動追加效果）"},"Flare Boost":{name:"受熱激升",effect:"（燒傷狀態時，特攻能力x1.5）"},"Sand Force":{name:"沙之力",effect:"（沙暴天下氣，岩、鋼、地系招式威力x1.3）"},Electromorphosis:P,"Wind Power":{name:"風力發電",effect:"（受到風的招式或順風影響時，進入充電狀態）"},Pixilate:S,Galvanize:p,"Punk Rock":{name:"龐克搖滾",effect:"（使出聲音類招式時，威力x1.3，受到聲音類招式傷害x0.5）"},Analytic:y,"Toxic Boost":{name:"中毒激升",effect:"（中毒或劇毒狀態時，攻擊能力x1.5）"},"Rocky Payload":{name:"搬岩",effect:"（岩石系招式威力x1.5）"},"Steely Spirit":{name:"鋼之意志",effect:"（鋼系招式威力x1.5）"},"Mega Launcher":{name:"超級發射器",effect:"（使出波動、波導類招式時，威力x1.5）"},Sniper:h,"Supreme Overlord 1":{name:"大將-1",effect:"（出場時先前每有n名隊友瀕死，傷害便x1.n倍）"},"Supreme Overlord 2":{name:"大將-2",effect:"（出場時先前每有n名隊友瀕死，傷害便x1.n倍）"},"Supreme Overlord 3":{name:"大將-3",effect:"（出場時先前每有n名隊友瀕死，傷害便x1.n倍）"},Protosynthesis:H,"Quark Drive":{name:"夸克充能",effect:"（攜帶驅勁能量或電氣場地下，HP外最高能力x1.3；若為速度則x1.5）"},"Orichalcum Pulse":{name:"緋紅脈動",effect:"（出場時天氣變為大晴天；大晴天下攻擊能力提升33%）"},"Hadron Engine":{name:"強子引擎",effect:"（出場時場地變為電氣場地；電氣場地下特攻能力提升33%）"},"Liquid Voice":{name:"濕潤之聲",effect:"（所有的聲音招式都變為水屬性）"},"Thick Fat":{name:"厚脂肪",effect:"（受到火、冰系招式攻擊時傷害減半）"},"Purifying Salt":{name:"潔淨之鹽",effect:"（受到鬼系招式傷害減半，不會陷入異常狀態）"},"Solid Rock":{name:"堅硬岩石",effect:"（受到效果絕佳招式的傷害x0.75）"},Filter:d,Heatproof:v,Multiscale:k,"Marvel Scale":{name:"神奇鱗片",effect:"（陷入異常狀態時，防禦x1.5）"},"Fur Coat":{name:"毛皮大衣",effect:"（受到物理招式的傷害減半但火系招式傷害加倍）"},"Ice Scales":{name:"冰鱗粉",effect:"（受到特殊招式的傷害減半）"},"Dry Skin":{name:"乾燥皮膚",effect:"（受到火系招式攻擊時，傷害x1.25）"},"Heavy Metal":{name:"重金屬",effect:"（自己的體重變成2倍）"},"Light Metal":{name:"輕金屬",effect:"（自己的體重減半）"}};export{o as Adaptability,y as Analytic,t as Blaze,P as Electromorphosis,d as Filter,p as Galvanize,u as Guts,v as Heatproof,r as Hustle,k as Multiscale,e as Overgrow,S as Pixilate,a as Protean,H as Protosynthesis,l as Reckless,x as Rivalry,s as Sharpness,h as Sniper,c as Stakeout,f as Swarm,m as Technician,n as Torrent,i as Transistor,w as default};

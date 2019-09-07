function Playlist() {
	// this list is in southbound order
    this.stack = [
		{
			id: 11,
			title:'Cottonwood Creek',
	        audiourl:'http://www.dev.mapteam.com/~jhagstrand/voyc/html/touring/audio/cottonwood-creek.mp3',
			photourl: 'http://lh6.ggpht.com/_yWey_Zelk3E/TGoTDrsNFtI/AAAAAAAAAkg/dqjbs4WBUI4/s800/la-paloma.jpg',
			storyurl:'http://www.projectcleanwater.org/pdf/car/Ctnwd4-6_L.pdf',
			nLat: 33.04865541,                                     
			nLon: -117.2939336,
			sLat: 33.047931,
			sLon: -117.2939202,
			played:false,
			rightNorth:false,
			script: 'Cottonwood Creek.  This ravine is part of Moonlight Beach Park.  Cottonwood Creek runs through this ravine and dumps onto the beach two blocks to the west.  The creek was instrumental in the creation of the town of Encinitas. It supplied water for the California Southern Railroad and was a major source of water for early settlers.'
		},
		{
			id: 1,
			title:'El Callejon',
	        audiourl:'http://www.dev.mapteam.com/~jhagstrand/voyc/html/touring/audio/el-callejon.mp3',
			photourl: 'http://lh3.ggpht.com/_yWey_Zelk3E/TGoTCqwq2KI/AAAAAAAAAkY/hr_4y1s9Q2E/s800/el-callejon.jpg',
			storyurl: 'http://el-callejon.com/el_callejon/HomePages/EncinitasHome.html',
			nLat: 33.0476841,
			nLon: -117.2937673,
			sLat: 33.0476841,
			sLon: -117.2937673,
			played:false,
			rightNorth:true,
			script: 'El Callejon.  Mexican restaurant featuring traditional recipes.  Come into the Tequila bar and say hello to Oscar the bartender.  The best margarita in town, and it\'s only $3 during happy hour, every day from 3 to 6.'
		},
		{
			id: 2,
			title:'La Paloma Theatre',
	        audiourl:'http://www.dev.mapteam.com/~jhagstrand/voyc/html/touring/audio/lapaloma.mp3',
			photourl: 'http://lh6.ggpht.com/_yWey_Zelk3E/TGoTDrsNFtI/AAAAAAAAAkg/dqjbs4WBUI4/s800/la-paloma.jpg',
			storyurl: 'http://lapalomatheatre.com/',
			nLat: 33.046533046,
			nLon: -117.293681,
			sLat: 33.046533046,
			sLon: -117.293681,
			played:false,
			rightNorth:true,
			script: 'La Paloma Theatre.  Opened in 1928.  One of the first theatres to show talkies, it also has a vaudeville stage, and originally had a Kilgen Wonder pipe organ.  The Spanish Mission and art deco design was conceived by Edward J. Baum of Santa Monica and Carroll N. Cook of Hollywood.  It was built for $50,000 in 1928, financed by Aubrey Austin, president of the Santa Monica Savings Bank.  Today it\'s a favorite community venue, often hosting local surf movie premieres, and occasional concerts.'
		},
		{
			id: 3,
			title:'East Village Diner',
	        audiourl:'http://www.dev.mapteam.com/~jhagstrand/voyc/html/touring/audio/east-village-asian-diner.mp3',
			photourl: 'http://lh4.ggpht.com/_yWey_Zelk3E/TGoTFkOPvYI/AAAAAAAAAks/meq2fDtQiLI/s800/east-village-diner.jpg',
			storyurl:'http://www.eateastvillage.com/',
			nLat: 33.044174545,
			nLon: -117.2936359,
			sLat: 33.044174545,
			sLon: -117.2936359,
			played:false,
			rightNorth:false,
			script: 'East Village Asian Diner.  Fresh, flavorful Asian comfort food.  Casual atmosphere.  Dishes from Japan, Korea, China, and other regions of Asia, and a wide range of beers, wine, and mixers.'
		},
		{
			id: 31,
			title:'Wenz Building',
	        audiourl:'http://www.dev.mapteam.com/~jhagstrand/voyc/html/touring/audio/wenz-building.mp3',
			photourl: 'http://lh6.ggpht.com/_yWey_Zelk3E/TG5lpuKFK-I/AAAAAAAAAlc/3Kjen0siMqE/wenz-building.jpg',
			storyurl:'http://encinitashistoricalsociety.com/files/Downtown_Encinitas_007_History_of_Wenz_Building.pdf',
			nLat: 33.044174545,
			nLon: -117.2936359,
			sLat: 33.044174545,
			sLon: -117.2936359,
			played:false,
			rightNorth:false,
			script: 'Wenz Building.  The Detour hair salon is located in the Wenz Building.  In 1937 the building was owned by Herman and Georgie Wenz and it was half the size it is today.  Later enlarged, it was owned for a long time by the Danforth family.  The building has had several owners and at one time has housed the post office, a grocery market, and a five-and-dime variety store.'
		},
		{
			id: 4,
			title:'Kims',
	        audiourl:'http://www.dev.mapteam.com/~jhagstrand/voyc/html/touring/audio/kims.mp3',
			photourl: 'http://lh3.ggpht.com/_yWey_Zelk3E/TGoTGD0kgNI/AAAAAAAAAkw/T40nloYBEJE/s800/kims.jpg',
			storyurl:'http://www.kimsvietnameseandchinese.com/index.html',
			nLat: 33.04267937,
			nLon: -117.2933435,
			sLat: 33.04267937,
			sLon: -117.2933435,
			played:false,
			rightNorth:true,
			script: 'Kim\'s Vietnamese and Chinese Restaurant.  Family owned and operated since 1986.  Kim is a beautiful and charming woman and she creates an elegant atmosphere.  The food is authentic, fresh, and fantasic.  The menu is extensive.'
		},
		{
			id: 5,
			title:'Lumberyard',
	        audiourl:'http://www.dev.mapteam.com/~jhagstrand/voyc/html/touring/audio/lumberyard.mp3',
			photourl: 'http://lh5.ggpht.com/_yWey_Zelk3E/TGpKRsyoHUI/AAAAAAAAAlE/8NGcpjFwLvc/lumberyard.jpg',
			storyurl:'',
			nLat: 33.04285025,
			nLon: -117.2933918,
			sLat: 33.0388974,
			sLon: -117.2928553,
			played:false,
			rightNorth:true,
			script: 'The Lumberyard.  A four-block long strip mall.  Built in the late 70\'s.  A series of one-story red brick structures.'
		},
		{
			id: 51,
			title:'Blue Sky Mural',
	        audiourl:'http://www.dev.mapteam.com/~jhagstrand/voyc/html/touring/audio/blue-sky-mural.mp3',
			photourl: 'http://lh5.ggpht.com/_yWey_Zelk3E/TGoTG5frfuI/AAAAAAAAAk0/B8RyvO7Polw/s1152/sky-mural.jpg',
			storyurl:'',
			nLat: 33.041856,
			nLon: -117.293429,
			sLat: 33.041856,
			sLon: -117.293429,
			played:false,
			rightNorth:false,
			script: 'Blue sky mural.  I don\'t know anything about this building but check out the mural painted all along the second story.'
		},
		{
			id: 6,
			title:'Java Hut',
	        audiourl:'http://www.dev.mapteam.com/~jhagstrand/voyc/html/touring/audio/java_hut.mp3',
			photourl: 'http://lh6.ggpht.com/_yWey_Zelk3E/TB738-HI4FI/AAAAAAAAAfs/XXLBTa8fsjQ/s800/2010-06-19%2017.48.10.jpg',
			nLat: 33.03746067,
			nLon: -117.2926703,
			sLat: 33.03746067,
			sLon: -117.2926703,
			played:false,
			rightNorth:false,
			script: 'The Java Hut.  This is a local coffee shop and hangout with years of tradition and local surf culture.  You can still buy surfboard wax for the original low price of $1.00 per block.'
		},
		{
			id: 7,
			title:'Self-Realization Fellowship',
	        audiourl:'http://www.dev.mapteam.com/~jhagstrand/voyc/html/touring/audio/srf.mp3',
			photourl: 'http://lh5.ggpht.com/_yWey_Zelk3E/TB72kWuRioI/AAAAAAAAAYw/DFgwzmJ_bZs/s800/2010-06-19%2016.35.06.jpg',
			nLat: 33.036783,
			nLon: -117.2923457,
			sLat: 33.0352728,
			sLon: -117.291573,
			played:false,
			rightNorth:false,
			script: 'Self-Realization Fellowship.  This unique property bounded by the white stucco walls with the purple and gold lotus blossom turrets was the home of Yogandana, the beloved guru.  Yogananda brought Hindu yogic thought from India to America.  He arrived in New York in the 30\'s, travelled all over the country speaking and teaching, and ended up here in Encinitas in the 50\'s.  You may have noticed the yoga studios and other new age establishments all over Encinitas.  These are evidence of the influence of Yogananda\'s stay here.  This property is now a monastary run by the Self-Realization Fellowship, or SRF, who carry on Yogananda\'s tradition.',
		},
		{
			id: 8,
			title:'Swami\'s State Park',
	        audiourl:'http://www.dev.mapteam.com/~jhagstrand/voyc/html/touring/audio/swamis_state_park.mp3',
			photourl: 'http://lh4.ggpht.com/_yWey_Zelk3E/TB73_IalKSI/AAAAAAAAAf8/bxs2LbacgFk/s800/2010-06-19%2017.48.36.jpg',
			nLat: 33.035128,
			nLon: -117.291551,
			sLat: 33.0341575,
			sLon: -117.290918,
			played:false,
			rightNorth:false,
			script: 'Swami\'s State Park.  Named for the world class surf spot below.  The surfers named this location in honor of Swami Yogananda.'
		},
		{
			id: 9,
			title:'Cardiff Composer District',
	        audiourl:'http://www.dev.mapteam.com/~jhagstrand/voyc/html/touring/audio/composer-district.mp3',
			photourl: 'http://lh3.ggpht.com/_yWey_Zelk3E/TG5qoijitII/AAAAAAAAAl8/1nK6k4P7mQg/s640/composer-district.jpg',
			nLat: 33.0304966,
			nLon: -117.289019,
			sLat: 33.0255853,
			sLon: -117.286251,
			played:false,
			rightNorth:true,
			script: 'Cardiff Composer District.  In 1912, when Cardiff by the Sea was first developed, Victor Kremer moved to San Diego to find a better climate for his wife who was suffering from tuberculosis.  Four years later he began buying up land here in the north part of Cardiff.  Kremer had run a music publishing business in Chicago, and here he named the streets after composers, and sold many of his lots to his musician friends.  He would bring his vaudeville friends up from San Diego to show them the area and sell them lots, getting $100 for a 50-foot lot.'
		},
		{
			id: 10,
			title:'San Elijo State Beach',
	        audiourl:'http://www.dev.mapteam.com/~jhagstrand/voyc/html/touring/audio/san_elijo_sb.mp3',
			photourl: 'http://lh6.ggpht.com/_yWey_Zelk3E/TB72bx2QMZI/AAAAAAAAAYA/Ai-iqi5vIvw/s800/2010-06-19%2016.25.41.jpg',
			nLat: 33.024200,
			nLon: -117.285479,
			sLat: 33.0165355,
			sLon: -117.281177,
			played:false,
			rightNorth:false,
			script: 'San Elijo State Beach.  Perched up on the bluff above the beach is this campground with facilities for campers and tents.  It\'s part of California\'s wonderful state park system.  Just south of the park entrance is the Eli Howard surf school.  They have great surfing instruction with classes for kids and families.'
		},
		{
			id: 11,
			title:'Restaurant Row',
	        audiourl:'http://www.dev.mapteam.com/~jhagstrand/voyc/html/touring/audio/restaurant_row.mp3',
			photourl: 'http://lh6.ggpht.com/_yWey_Zelk3E/TB71eJPfBVI/AAAAAAAAASk/7PqGZfIaA0Y/s800/2010-06-19%2015.39.46.jpg',
			nLat: 33.013755,
			nLon: -117.279996,
			sLat: 33.0112456,
			sLon: -117.279267,
			played:false,
			rightNorth:true,
			script: 'Restaurant Row.  This commercial strip along the water contains five restaurants.  The tall blue building there is Ki\'s, K-I-appostrophe-S.  Ki was the nickname of Katherine Holcomb.  She and her son Barry started Ki\'s as a juice and vitamin store in 1980.  Soon Ki started serving home-cooked healthy meals.  It gradually grew and grew and in 1994 they moved out here to this location.  Still serving fresh nutritious meals, still owned by the Holcomb family, and now with ocean views from the second floor dining area.'
		},
		{
			id: 12,
			title:'San Elijo Lagoon',
	        audiourl:'http://www.dev.mapteam.com/~jhagstrand/voyc/html/touring/audio/san_elijo_lagoon.mp3',
			photourl: 'http://lh5.ggpht.com/_yWey_Zelk3E/TB71fSJ9Q0I/AAAAAAAAASs/FHYw77jeras/s800/2010-06-19%2015.40.05.jpg',
			nLat: 33.011002,
			nLon: -117.279267,
			sLat: 33.003211,
			sLon: -117.277572,
			played:false,
			rightNorth:true,
			script: 'The San Elijo Lagoon.  This low flat area between Cardiff and Solana Beach is one of San Diego\'s last estuaries.  This estuary - or coastal wetland - creates unique habitats for rare animals and plants, due to the exchange of fresh water feeding in from Escondido Creek, and salt water running in from the ocean with the tide.  The San Elijo Lagoon is a state park.  It extends eastward all the way to Rancho Santa Fe, encompassing 1000 acres, and seven miles of hiking and biking trails.'
		},
		{
			id: 13,
			title:'test 1',
	        audiourl:'http://www.dev.mapteam.com/~jhagstrand/voyc/html/touring/audio/test1.mp3',
			photourl: 'http://www.animalpictures1.com/data/media/62/giraffe-14.jpg',
			nLat: 33.032480,
			nLon: -117.288142,
			sLat: 33.032480,
			sLon: -117.288142,
			played:false,
			rightNorth:false,
			script: 'Test 1.  This is a test.'
		}
    ];

    this.current = 0;
}
Playlist.prototype = {
    draw: function(el) {
        this.el = el;
        var s = '<table class="playlist-table">';
        s += '<col class="playlist-col-nowplaying">';
        s += '<col class="playlist-col-title">';
        for (var i=0; i<this.stack.length; i++) {
            s += '<tr><td class="playlist-row" id="playlist-row-nowplaying-'+i+'">-</td><td class="playlist-row"><a href="#" onclick="touring.player.playStory('+i+')">'+this.stack[i].title+'</a></td></tr>';
        }
        s += '</table>';
        this.el.innerHTML = s;
    },
    onPlay: function() {
        // which track is playing?
        alert('hi');
        var i = 0;
        var el = document.getElementById('playlist-row-nowplaying-'+i);
        el.innerHTML = '>';
    },
    findNext: function(bbox) {
    	// calc hit box
    	var rect;
        for (var i=0; i<this.stack.length; i++) {
        	if (this.stack[i].played) {
        		continue;
        	}
        	//if (touring.touring.isPointInBox({lat:this.stack[i].lat, lon:this.stack[i].lon}, bbox)) {
        	rect = {x:bbox.s, y:bbox.w, width:bbox.e-bbox.w, height:bbox.n-bbox.s};
        	if (lineIntersectsRect({x:this.stack[i].nLat, y:this.stack[i].nLon}, {x:this.stack[i].sLat, y:this.stack[i].sLon}, rect)) {
        		return i;
        	}
        }
        return -1;
    }
}

import { View, StyleSheet, Dimensions, Text} from 'react-native';
import React, { useState, useEffect} from 'react';
import 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient'
import { Button } from '@rneui/themed'
import { supabase } from '../lib/supabase';


const PAGE_HEIGHT = Dimensions.get('window').height;

const PAGE_WIDTH = Dimensions.get('window').width;

function Home({navigation}) {

    // create words dataset
  
    var idCounter = 0;
  
    // var nouns = ["area","book","business","case","child","company","country","day","eye","fact","family","government","group","hand","home","job","life","lot","man","Mischelove", "money","month","mother","Mr","night","number","part","people","place","point","problem","program","question","right","room","school","state","story","student","study","system","thing","time","water","way","week","woman","word","work","world","year"]
  
    // var verbs = ["be","become","begin","call","can","come","could","do","feel","find","get","give","go","have","hear","help","keep","know","leave","let","like","live","look","love", "make","may","mean","might","move","need","play","put","run","say","see","seem","should","show","start","take","talk","tell","think","try","turn","use","want","will","work","would"]
  
    //var subjects = ["I","you","he","they","we","she","who","them","me","him","one","her","us","something","nothing","anything","himself","everything","someone","themselves","everyone","itself","anyone","myself"]
    
    // var adjectives = ["bad","best","better","big","black","certain","clear","different","early","easy","economic","federal","free","full","good","great","hard","high","human","important","international","large","late","little","local","long","low","major","military","my", "national","new","old","only","other","political","possible","public","real","recent","right","small","social","special","strong","sure","TRUE","white","whole","young"]
    
    var nounsEs = ['persona', 'agua', 'aire', 'anillo', 'animal', 'arte', 'bandera', 'barco', 'beso', 'cama', 'campo', 'cielo', 'cinta', 'comida', 'cuerda', 'dedo', 'dinero', 'escuela', 'flor', 'fruta', 'grano', 'hombre', 'hora', 'iglesia', 'libro', 'luz', 'mano', 'mapa', 'mesa', 'mundo', 'mujer', 'musica', 'nariz', 'nieve', 'papel', 'paraguas', 'parka', 'pastel', 'pelo', 'pizza', 'puerta', 'reloj', 'roca', 'sal', 'silla', 'sombrero', 'suelo', 'taza', 'tierra', 'tigre', 'torre', 'ventana', 'viento']
  
    // additional nouns ["área","libro","negocio","caso","niño","compañía","país","día","ojo","hecho","familia","gobierno","grupo","mano","hogar","trabajo","vida","lote","hombre","Mischelove","dinero","mes","madre","señor","noche","número","parte","gente","lugar","punto","problema","programa","pregunta","derecha","habitación","escuela","estado","historia","estudiante","estudio","sistema","cosa","tiempo","agua","camino","semana","mujer","palabra","trabajo","mundo","año"]
    
    var verbsEs = ['ser', 'estar', 'tener', 'amar', 'hacer', 'decir', 'ir', 'ver', 'poder', 'querer', 'llevar', 'saber', 'traer','deber', 'venir', 'haber', 'hablar', 'buscar', 'llamar', 'pasar', 'levantar', 'coger', 'dejar', 'encontrar', 'entrar', 'guardar', 'gustar', 'importar', 'jugar', 'mantener', 'mirar', 'montar', 'necesitar', 'ocurrir', 'ofrecer', 'pedir', 'permitir', 'poner', 'probar', 'seguir', 'sentir', 'servir', 'suceder', 'terminar', 'intentar', 'resultar']
  
    var subjectsEs = ["yo","tú","él","ellos","nosotros","ella","quién","ellos","mí","él","uno","ella","nosotros","algo","nada","cualquier cosa","él mismo","todo","alguien","ellos mismos","todos","si misma","cualquier persona","yo mismo"]
    
    var adjectivesEs = ["chileno", "malo","mejor","mejor","grande","negro","seguro","claro","diferente","temprano","fácil","económico","libre","completo","bueno","grande","duro","alto","humano","importante","internacional","grande","tarde","pequeño","local","largo","bajo","importante","militar","mío","nacional","nuevo","viejo","solo","otro","político","posible","público","real","reciente","derecho","pequeño","social","especial","fuerte","seguro","verdadero","blanco","completo","joven"]
    
    // English versions:
  
    var nounsEng = ["person", "water", "air", "ring", "animal", "art", "flag", "boat", "kiss", "bed", "field", "sky", "ribbon", "food", "rope", "finger", "money", "school", "flower", "fruit", "grain", "man", "hour", "church", "book", "light", "hand", "map", "table", "world", "woman", "music", "nose", "snow", "paper", "umbrella", "parka", "cake", "hair", "pizza", "door", "clock", "rock", "salt", "chair", "hat", "floor", "cup", "earth", "tiger", "tower", "window", "wind"]
    
    var subjectsEng =   ["I","you","he","they","we","she","who","them","me","him","one","her","us","something","nothing","anything","himself","everything","someone","themselves","everyone","itself","anyone","myself"]
  
    var verbsEng = ['be', 'stay', 'have', 'love', 'make', 'say', 'go', 'see', 'be able to', 'want', 'carry', 'know', 'bring', 'owe', 'come', 'have', 'speak', 'look for', 'call', 'pass', 'raise', 'catch', 'leave', 'find', 'enter', 'save', 'like', 'matter', 'play', 'maintain', 'look', 'ride', 'need', 'happen', 'offer', 'ask', 'allow', 'put', 'try', 'follow', 'feel', 'serve', 'happen', 'finish', 'try', 'result']  
  
    var adjectivesEng = ["Chilean", "bad", "better", "better", "big", "black", "safe", "clear", "different", "early", "easy", "economic", "free", "full", "good", "big", "hard", "high", "human", "important", "international", "big", "late", "small", "local", "long", "low", "important", "military", "mine", "national", "new", "old", "only", "other", "political", "possible", "public", "real", "recent", "right", "small", "social", "special", "strong", "safe", "true", "white", "full", "young"]
  
    // Korean
  
    var nounsKo = ['사람', '물', '공기', '반지', '동물', '예술', '깃발', '배', '키스', '침대', '들판', '하늘', '리본', '음식', '줄', '손가락', '돈', '학교', '꽃', '과일', '곡물', '남자', '시간', '교회', '책', '빛', '손', '지도', '테이블', '세계', '여자', '음악', '코', '눈', '종이', '우산', '패딩조끼', '케이크', '머리', '피자', '문', '시계', '바위', '소금', '의자', '모자', '바닥', '컵', '지구', '호랑이', '탑', '창문', '바람']
  
    // additional nouns ["área","libro","negocio","caso","niño","compañía","país","día","ojo","hecho","familia","gobierno","grupo","mano","hogar","trabajo","vida","lote","hombre","Mischelove","dinero","mes","madre","señor","noche","número","parte","gente","lugar","punto","problema","programa","pregunta","derecha","habitación","escuela","estado","historia","estudiante","estudio","sistema","cosa","tiempo","agua","camino","semana","mujer","palabra","trabajo","mundo","año"]
    
    var verbsKo = ['있다', '되다', '가지다', '사랑하다', '하다', '말하다', '가다', '보다', '할 수 있다', '원하다', '가져가다', '알다', '가져오다','해야 하다', '오다', '있다', '말하다', '찾다', '부르다', '지나가다', '들어올리다', '잡다', '내려놓다', '발견하다', '들어가다', '보관하다', '좋아하다', '중요하다', '놀다', '유지하다', '바라보다', '올라타다', '필요하다', '발생하다', '제공하다', '요청하다', '허용하다', '싣다', '시험하다', '따라가다', '느끼다', '서비스하다', '발생하다', '끝내다', '시도하다', '결과나다']
  
    var subjectsKo = ["나","당신","그","그들","우리","그녀","누구","그들","나 자신","그","하나","그녀","우리","뭔가","아무것도","무엇이든지","그 자신","모든 것","누군가","그들 자신","모두","그 자신","누구든지","나 자신"]
    
    var adjectivesKo = ["칠레인", "나쁨", "더 좋음", "더 좋음", "큼", "검정", "안전함", "분명함", "다름", "초기", "쉬움", "경제적", "자유롭게", "완벽함", "좋음", "큼", "단단함", "높이", "인간적", "중요함", "국제적", "큼", "늦게", "작음", "지역적", "길게", "낮음", "중요함", "군사적", "나의", "국가적", "새로움", "오래됨", "혼자", "다른", "정치적", "가능함", "공공의", "실제", "최근의", "권리", "작은", "사회적", "특별함", "강함", "안전함", "진실함", "흰색", "완벽함", "젊음"]
  
    const initialWordsKo = [];
  
    // add words to initial array Korean
    for (var i=0; i<nounsKo.length; i++) {
      initialWordsKo.push({id: idCounter, word: nounsKo[i], type:"noun", translation: nounsEng[i]});
      idCounter++;  
    }
  
    for (var i=0; i<verbsKo.length; i++) {
      initialWordsKo.push({id: idCounter, word: verbsKo[i], type:"verb", translation: verbsEng[i]}); 
      idCounter++;   
    }
  
    for (var i=0; i<subjectsKo.length; i++) {
      initialWordsKo.push({id: idCounter, word: subjectsKo[i], type:"subject", translation: subjectsEng[i]}); 
      idCounter++;   
    }
  
    for (var i=0; i<adjectivesKo.length; i++) {
      initialWordsKo.push({id: idCounter, word: adjectivesKo[i], type:"adjective", translation: adjectivesEng[i]}); 
      idCounter++;   
    }
  
      // add words to initial array Spanish
  
    const initialWordsEs = [];
  
    for (var i=0; i<nounsEs.length; i++) {
      initialWordsEs.push({id: idCounter, word: nounsEs[i], type:"noun", translation: nounsEng[i]});
      idCounter++;  
    }
  
    for (var i=0; i<verbsEs.length; i++) {
      initialWordsEs.push({id: idCounter, word: verbsEs[i], type:"verb", translation: verbsEng[i]}); 
      idCounter++;   
    }
  
    for (var i=0; i<subjectsEs.length; i++) {
      initialWordsEs.push({id: idCounter, word: subjectsEs[i], type:"subject", translation: subjectsEng[i]}); 
      idCounter++;   
    }
  
    for (var i=0; i<adjectivesEs.length; i++) {
      initialWordsEs.push({id: idCounter, word: adjectivesEs[i], type:"adjective", translation: adjectivesEng[i]}); 
      idCounter++;   
    }
  
    // create state with initial array
    const [wordsKo, setWordsKo] = useState(initialWordsKo);
    const [wordsEs, setWordsEs] = useState(initialWordsEs);

    // Retrieve session
      
    const [session, setSession] = useState()
      
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })
  
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })


    const renderButtons = () => { 
      
        if (!session?.user) {
          return (
            <View>
                <Button buttonStyle={{ backgroundColor: '#FFC107' }} onPress={() => navigation.navigate('LogIn', {session: session, setSession: setSession})}>Login</Button>
            </View>
            )
        }

        if (session?.user) {
          return (
            <View>
                <View style={styles.textContainer}>
                  <Text style={styles.mainText}>Choose a language</Text>
                </View>     
                <View style={styles.buttonsContainer}>
                  <View style={styles.buttonContainer}>
                      <Button buttonStyle={{ backgroundColor: '#FFC107', marginRight: 30}} onPress={() => navigation.navigate('Build', {words: wordsKo, setWords: setWordsKo, lang: "Korean", langCode: "ko"})}>Korean</Button>            
                      <Button buttonStyle={{ backgroundColor: '#FFC107' }} onPress={() => navigation.navigate('Build', {words: wordsEs, setWords: setWordsEs, lang: "Spanish", langCode: "es"})}>Spanish</Button>
                  </View>
                  <View style={styles.phrasebookContainer}>
                      <Button buttonStyle={{ backgroundColor: '#FFC107', width: 120}} onPress={() => navigation.navigate('Phrasebook')}>Phrasebook</Button>
                  </View>
                  <View style={styles.logOutContainer}>
                      <Button buttonStyle={{ backgroundColor: '#FFC107' }} onPress={() => supabase.auth.signOut()}>Log Out</Button>
                  </View>
                </View>
            </View>
          )
        }
      } 
  
    return (
      <View style={styles.mainContainer}>
        <LinearGradient 
        colors={['#9F00B9', '#FFDC61']}
        locations={[0, .99]}
        style={styles.linearGradient}
        />
        <View style={styles.bottomContainer}>                    
          {renderButtons()}
        </View>
      </View>
    )
  }

  const styles = StyleSheet.create({
    topContainer: {
      flex: 1,
      paddingTop: PAGE_HEIGHT/10,
    },
    linearGradient: {
      position: 'absolute',
      height: PAGE_HEIGHT,
      left: 0,
      right: 0,
      top: 0,    
    },
    mainContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center', 
      padding: 10
    },
    bottomContainer: {
      display: 'flex',
      padding: 10,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: PAGE_WIDTH,
      height: PAGE_HEIGHT*.8
  },
    textContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: PAGE_WIDTH,
    },
    mainText: {
      fontSize: 54,
      color: "white",
     },
    buttonsContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10
    },
    buttonContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      padding: 10
    },
    phrasebookContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      padding: 10
    },
    logOutContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      padding: 10
    },      
  })

export default Home
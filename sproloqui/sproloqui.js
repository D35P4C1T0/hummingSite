$(document).ready(function() {
  var isReading = false;

  var bestemmie = [
    'Dio caterpillar',
    'Dio cane',
    'Dio porco',
    'Dio letame',
    'Dio imbufalito',
    'Dio fetido',
    'Dio lercio',
    'Dio paninaro',
    'Dio bobba fet',
    'Dio bastardo',
    'Dio cancaro',
    'Dio paninaro',
    'Dio marmotta che confeziona la cioccolata',
    'Dio pederasta',
    'Dio bulimico',
    'Dio delle città dell immensità',
    'Dio sculacciatopi',
    'Dio cantante lirico',
    'Dio comunista',
    'Dio euroscettico',
    'Dio Windows Vista',
    'Dio Berlusconi',
    'Dio ciclista senza sellino',
    'Dio democristiano',
    'Dio luigis menshion',
    'Dio gnomo mongoloide',
    'Dio cucitore di scarpe della Nike sottopagato',
    'Dio con la pensione minima',
    'Dio spiedino',
    'Dio mondial casa',
    'Dio #escile',
    'Dio lampione nel culo',
    'Dio miope senza occhiali',
    'Dio padre di un finocchio ebreo',
    'Dio maiale putrido con la sifilide',
    'Dio sconsacrato',
    'Dio pedofilo',
    'Dio culo sfondato',
    'Dio scalzo nella valle dei chiodi',
    'Dio assortimento di colori a pastello',
    'Dio assorbente sporco',
    'Dio pisellatore',
    'Dio caterpillar',
    'Dio sculacciatopi',
    'Dio ateo',
    'Dio no skin su fortnite',
    'Dio euroscettico',
    'Dio dio',
    'Dio cucitore di scarpe della naik sottopagato',
    'Dio con la pensione minima',
    'Dio merda',
    'Dio cammello zoppo',
    'Dio inutile',
    'Dio lurido',
    'Dio rinoceronte con un corno rotto dentro il culo ',
    'Cristo ornitorinco',
    'Cristo crostaceo',
    'Cristo Abduh il kebabbaro',
    'Cristo mietitore',
    'Cristo MecBècon',
    'Cristo malanno',
    'Cristo imbianchino',
    'Cristo palla di lardo',
    'Cristo joker',
    'cristo che per la fame mangia la rugine formatasi sui chiodi della croce ',
    'Cristo elettrosessuale',
    'Gesù cocainomane in comunita',
    'Gesù gesuita',
    'Gesù Samsung a Cupertino',
    'Gesù bestia cane di Satana',
    'Gesù iracheno pilota di autobombe',
    'Gesù peto nella valle del silenzio',
    'Gesù tassista nella valle della ZTL',
    'Gesù clown nella valle dei dispetti',
    'Gesù specchio nella valle dei cessi immondi',
    'Gesù obeso nella valle dei tapis-roulant',
    'Gesù plexiglas nella valle dei proiettili',
    'Gesù paglia nella valle degli incendi spontanei',
    'Gesù donna nella valle dei benzinai self-service',
    'Gesù carcerato nella valle delle saponette scivolose',
    'Gesù vacca nella valle dei macellai                  ',
    'Gesù bagno nella valle dell\'influenza intestinale    ',
    'Gesù pecora nella valle dei sardi arrapati           ',
    'Gesù spazzino nelle valli partenopee                 ',
    'Gesù scheletro nella valle dei cani rabbiosi         ',
    'Gesù culo magnetico nella valle dei cazzi di ferro   ',
    'Gesù sottomarino nella valle dei polipi giganti      ',

    'Madonna contorsionista                                                ',
    'Madonna troia fetida                                                  ',
    'Madonna sverginata                                                ',
    'Madonna cagna                                                ',
    'Madonna col culo aperto                                                ',
    'Madonna pompinara                                                ',
    'Madonna extravergine dolìva                                          ',
    'Madonna idrovolante                                                   ',
    'Madonna pescivendola                                                  ',
    'Madonna suora                                                         ',
    'Madonna erbaccia                                                      ',
    'Madonna televenditrice di aspirapolveri                               ',
    'Madonna Britney Spears                                                ',
    'Madonna Microsoft                                                     ',
    'Madonna carota                                                        ',
    'Madonna in agrodolce                                                  ',
    'La Madonna con la fregna slabbrata che quando corre applaude ',
    'Madonna centometrista sulle ginocchia                                 ',
    'Madonna Shuttle                                                       ',
    'Madonna senza veli                                                    ',
    'La Madonna in deltaplano                                              ',
    'Madonna vacca nella valle dei macellai                  ',
    'Madonna coyote nella valle di willy',
    'Madonna sgonfia nella valle delle pompe',
    'Madonna ninfomane nella valle degli eunuchi',
    'Madonna biancaneve',
    'Madonna masterball',
    'Madonna leccacazzi',
    'Madonna cassiera al supermercato dei dildi di ghiaccio',
    'Madonna suora',
    'Madonna idrovolante',
    'Madonna centometrista sulle ginocchia',
    'Madonna dirigibile bucato',
    'Madonna tramortita da un pompa che toglie 12 di danno ',

  ];

  $('#bestemmia').click(function() {
    var conteggio = bestemmie.length;
    var random = Math.floor((Math.random() * conteggio) + 1);

    responsiveVoice.speak(bestemmie[random], 'Italian Female');
  });

  $('#bestemmiaciclo').click(function() {
    var conteggio = bestemmie.length;
    var random = Math.floor((Math.random() * conteggio) + 1);
    responsiveVoice.speak(
        bestemmie[random], 'Italian Female',
        {onstart: StartCallback, onend: EndCallback});

    var myTimer = setInterval(function() {
      var conteggio = bestemmie.length;

      if (!isReading) {
        var random = Math.floor((Math.random() * conteggio) + 1);
        responsiveVoice.speak(
            bestemmie[random], 'Italian Female',
            {onstart: StartCallback, onend: EndCallback});
      }
    }, 1000);
  });

  function StartCallback() {
    isReading = true;
  }

  function EndCallback() {
    isReading = false;
  }
});

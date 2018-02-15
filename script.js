//Key (Dictionary): 8c097ee5-8e3c-413e-b3c5-dc8501967414

// Key (Thesaurus): 091b9d9b-b494-4da5-85cf-a68ddb3c590f

// allows the page to be loaded before JS executed
$(document).ready(function() {

//API - if you send information it will give some back

  var clickerDict = function(e){
      e.preventDefault(); // prevents refreshing the page
      var value = $("#stackInput").val();
      //console.log(value);
      var myurl= "https://www.dictionaryapi.com/api/v1/references/collegiate/xml/" + value + "?key=8c097ee5-8e3c-413e-b3c5-dc8501967414"; ;
    	$.ajax({
    	    url : myurl,
    	    dataType : "xml",
    	    success : function(xml) {
    		  //console.log(xml);
          var definitions = xml.getElementsByTagName("dt");
          var toShow = "";
          toShow += "<h2> Definitions: </h2>";
          var num = 1;

          if (definitions.length === 0){
            toShow += "<p> No definitions found </p>";
            toShow += "<p> Check to make sure word is spelled correctly or that it is in English </p>";
          }
          for (var i = 0; i < definitions.length; i++){
            toShow += "<p> " + num + ". ";
            for (var j = 0; j < definitions.item(i).childNodes.length; j++){
                var dummy = definitions.item(i).childNodes[j].textContent;
                if (definitions.item(i).childNodes[j].nodeName === "#text" && dummy[0] === ':'){
                  toShow += dummy.slice(1);
                }
                else {
                  toShow += dummy;
                }
            }
            num++;
            toShow += "</p>";
          }
          $("#stackResults").html(toShow);
          //console.log(toShow);
        }});

    }


    var clickerThes = function(e){
        e.preventDefault(); // prevents refreshing the page
        var value = $("#weatherInput").val();
        console.log(value);
        var myurl= "https://www.dictionaryapi.com/api/v1/references/thesaurus/xml/" + value + "?key=091b9d9b-b494-4da5-85cf-a68ddb3c590f"; ;
        $.ajax({
            url : myurl,
            dataType : "xml",
            success : function(xml) {
            //console.log(xml);
            var meanings = xml.getElementsByTagName("sens");
            //console.log(meanings);
            var toShow = "";
            toShow += "<h2> Synonyms by meaning: </h2>";
            var num = 1;
            if (meanings.length === 0){
              toShow += "<p> No synonyms found </p>";
              toShow += "<p> Are there multiple words that mean this? </p>";
            }
            for (var i = 0; i < meanings.length; i++){
              toShow +=  "<strong>Meaning:</strong> " + meanings[i].getElementsByTagName("mc")[0].textContent + "<br/>";
              var synonyms = meanings[i].getElementsByTagName("syn");
              toShow += "<strong>Synonyms:</strong> " + synonyms[0].textContent + "</p>";
            }

            //console.log(meanings[0].getElementsByTagName("syn"));

            $("#weatherResults").html(toShow);
            //console.log(toShow);
          }});

      }

      var clickerSameWord = function(e){
          e.preventDefault(); // prevents refreshing the page
          var value = $("#stackInput").val();
          var myurl= "https://www.dictionaryapi.com/api/v1/references/thesaurus/xml/" + value + "?key=091b9d9b-b494-4da5-85cf-a68ddb3c590f"; ;
          $.ajax({
              url : myurl,
              dataType : "xml",
              success : function(xml) {
              console.log(xml);
              var meanings = xml.getElementsByTagName("sens");
              console.log(meanings);
              var toShow = "";
              toShow += "<h2> Synonyms by meaning: </h2>";
              var num = 1;
              if (meanings.length === 0){
                toShow += "<p> No synonyms found </p>";
                toShow += "<p> Are there multiple words that mean this? </p>";
              }
              for (var i = 0; i < meanings.length; i++){
                toShow +=  "<strong>Meaning:</strong> " + meanings[i].getElementsByTagName("mc")[0].textContent + "<br/>";
                var synonyms = meanings[i].getElementsByTagName("syn");
                toShow += "<strong>Synonyms:</strong> " + synonyms[0].textContent + "</p>";
              }

              //console.log(meanings[0].getElementsByTagName("syn"));

              $("#weatherResults").html(toShow);
              //console.log(toShow);
            }});

        }

      var sameWordButton = $("#sameWord");
      console.log(sameWordButton);
      $("#sameWord").click(clickerSameWord);
      var thesaurusButton = $("#weatherSubmit");
      console.log(thesaurusButton);
      $("#weatherSubmit").click(clickerThes)
      var submitButton = $("#stackSubmit");
      console.log(submitButton);
      $("#stackSubmit").click(clickerDict);
  });

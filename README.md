# Informácoós rendszerek beadandó feladat
Készített: Szacsuri Norbert (G0XXTC)

# Feladat leírása
Egy videókölcsönző alkalmazás elkészítése, REST api és Angular klienssel.

# Követelmények:
* Django framework használata a REST API elkészítéséhez.
	* **Módosult a Spring framework-re.**
* AngularJS használata a kliensoldal elkészítéséhez.
	* **Módosult az Angular 9-re.**
* Filmek adatbázisba való felvételének lehetősége.
* Filmek kölcsönzésének lehetősége.
	* Filmek státsuzát állítja kikölcsönzött / visszavitt-re.
* Kikölcsönzött/elérhető filmek listázásának lehetősége.

# Repository tartalma:
* Backend mappa
	* Ez tartalmazza a Spring frameworkkel készült REST API implementációját.
* Frontend mappa:
	* Ez tartalmazza az Angular 9-el készült webklienst.
	
# Előfeltételek
* MySQL adatbázis
	* Ez például a XAMPP programcsomaggal könnyedén telepíthető.
* JDK 1.8 (Java development kit 8)
* IDE (integrált fejlesztő környezet) & Maven
	* Például: IntelliJ IDEA, Mavennel integrálva
* Node & NPM
	* Letölthető: https://nodejs.org/en/
* Angular 9
	* CMD-ből futtatva: "`npm install -g @angular/cli`"
	
# Alkalmazás fordítása, indítása
* Adatbázis
	* Indítsuk el a MySQL adatbázist.
	* Futassuk le az "*/Backend/src/main/resources/database*" mappában található fájlok közül az alábbiakat:
		* *create.sql*
		* *init.sql*
	* A létrehozott adatbázis "videoteka" néven lesz megtalálható.
	* Ehhez az adatbázishoz hozzunk létre egy felhasználót írási és olvasási jogokkal. Az adatok legyenek:
		* Felhasználónév: "testuser"
		* Jelszó: "testpassword"
	* A "*/Backend/src/main/resources/application.properties*" fájlban módosítsuk az adatbázis elérési útvonalát és a bejelentkezési adatokat a környezetünknek megfeleően.
* Backend
	* Nyissuk meg (vagy importáljuk) a "*/Backend*" mappát az IDE-nkben.
		* Ezek általában magától felismerik a projekt típusát, de ha mégse Maven projektként kell importálni.
	* Ezután a Maven számos dependencyt (függőséget) fog letölteni az internetről.
		* Ha mégse érdemes a `maven:clean` és a `maven:install` parancsokat lefuttatni.
	* A "Main" osztályunk az "*src/main/java/hu/szacskesz/beadando/backend/ApplicationBootstrapper.java*"
		* Erre jobb klikkelve majdd futtatva elindítható a program.
			* Ha manuálisan szeretnénk futtatni akkor a `maven:clean` , `maven:install` , `maven:package` parancsok segítségével elkészíthető az önmagában futtatható JAR.
* Frontend
	* Nyissuk meg a "*/Frontend*" mappát egy CMD ablakban.
	* "`npm install`" parancsot kiadva letöltődnek a projekt dependency-jei (függőségei).
	* "`npm start`" parancsal lefordul és elindul a webkliensünk.
		* A webapp alapértelmezetten a http://localhost:4200 címen érhető el.
	* Az "`npm run-script build`" parancsal a "*dist*"  mappába kigenerálódik az alkalmazás tömörített és fordított állományai (HTML, CSS, JS).
		* Ennek a tartalmát egy közönséges Webszerverrel (pl.: Tomcat) statikusan kiszolgálva elérhetővé válik az alkalmazás.
	* A frontend konfigurálható részeit az "*src/assets/app.config.json*" vagy a fordított álkalmazásnál "*dist/assets/app.config.json*" fájl tartalmazza.
		* Ebben meglehet adni a Backend szerverünk elérési útvonalát és az egyes REST endpointok elérését is ha változna.
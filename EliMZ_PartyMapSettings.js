//==========================================================================
// EliMZ_PartyMapSettings.js
//==========================================================================

/*:
@target MZ
@base EliMZ_Book

@plugindesc v1.0 - Adds specific settings for the player on the map, according to the party leader.
@author Hakuen Studio
@url https://www.patreon.com/posts/40821023

@help
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
If you like my work, please consider supporting me on Patreon!
▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
============================================================================
Introduction
============================================================================

You can set specific configurations for the player according to the actor 
that is the party leader.

============================================================================
Features
============================================================================

You can change some configurations for the party sprites according to the 
actor that is the leader:

● Move Speed
● Opacity
● BlendMode
● Move Frequency
● Walk Animations
● Step Animations
● Direction Fix
● Through

============================================================================
How to use
============================================================================

Just set the following note tags on your actor's note(They are case 
sensitive):

<MoveSpeed:number>      Default is 4
<Opacity:number>        Default is 255
<BlendMode:number>      Default is 0
<MoveFrequency:number>  Default is 6
<StepAnime:true/false>  Default is false
<WalkAnime:true/false>  Default is true
<DirFix:true/false>     Default is false
<Through:true/false>    Default is false

============================================================================
Terms of Use
============================================================================

https://www.hakuenstudio.com/rpg-maker/terms-of-use

============================================================================
Links
============================================================================

Facebook - https://www.facebook.com/hakuenstudio
Instagram - https://www.instagram.com/hakuenstudio
Twitter - https://twitter.com/hakuen_studio
Itch Io - https://hakuenstudio.itch.io/

============================================================================
Update log
============================================================================
Version 1.0 - 09/11/2020
- Plugin release!

*/

"use strict"

var Imported = Imported || {};
Imported.Eli_PartyMapSettings = true;

var Eli = Eli || {};
Eli.PartyMapSettings = Eli.PartyMapSettings || {};

Eli.PartyMapSettings.Version = 1.0;

/* ========================================================================== */
/*                                    ALERT                                   */
/* ========================================================================== */

(() => {

const warning = `You don't have EliMZ_Book installed or don't have the latest version.
Please download it for free.`

function callEliBook(){
    window.open('https://www.patreon.com/posts/41472982')
};

function needBook() {
    if(!Eli.alert){
        window.alert(warning);
        if(confirm) callEliBook()
        Eli.alert = true;
    }
};

if(!Imported.Eli_Book || !Eli.Book.Version >= 1.0) needBook();

})();

/* ========================================================================== */
/*                                   OBJECTS                                  */
/* ========================================================================== */

{

/* ------------------------------- GAME PLAYER ------------------------------ */

const GamePlayer = Game_Player.prototype;

Eli.PartyMapSettings.Game_Player_refresh = GamePlayer.refresh;
GamePlayer.refresh = function() {
    Eli.PartyMapSettings.Game_Player_refresh.call(this);
    this.changeInitMembersByActor();
};

GamePlayer.changeInitMembersByActor = function(){
    if(!$gameParty.exists()) return;
    const meta = this.meta();
    this.setMoveSpeed(meta.MoveSpeed            ? +meta.MoveSpeed : 4);
    this.setOpacity(meta.Opacity                ? +meta.Opacity : 255);
    this.setBlendMode(meta.BlendMode            ? +meta.BlendMode : 0);
    this.setMoveFrequency(meta.MoveFrequency    ? +meta.MoveFrequency : 6);
    this.setWalkAnime(meta.WalkAnime            ? eli.toBoolean(meta.WalkAnime) : true);
    this.setStepAnime(meta.StepAnime            ? eli.toBoolean(meta.StepAnime) : false);
    this.setDirectionFix(meta.DirFix            ? eli.toBoolean(meta.DirFix) : false);
    this.setThrough(meta.Through                ? eli.toBoolean(meta.Through) : false);
};

}
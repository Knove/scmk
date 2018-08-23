const chalk = require('chalk');

function showLogo() {
    console.log(chalk.blue(' :@##########$- ;##########@:  -$####&.  :@####$-!##$-   -$##%. ')); 
    console.log(chalk.blue(' :@##!          !###;          -$#####%  ;#####$-!##$-  !##@:  '));  
    console.log(chalk.blue(' :@##;          %###;          -$##&$##; !#####$-!##%-.&##!   '));   
    console.log(chalk.blue(' :@#########&!.-$###;          -$##$:%#$;|#####$-!##@@##$-   '));    
    console.log(chalk.blue(' :@##########$-.&###;          -$##$--&#&$#####$-!@@###!     '));    
    console.log(chalk.blue('           !#$-:@###;          -$##$- :@###$$##$-!@@#%%#$-    '));   
    console.log(chalk.blue('           !#$-;####;          -$##$-  !##$!$##$-!###! :@#|   '));   
    console.log(chalk.blue('           !#$.!####;          -$##$-  .%#! $##$-!###!   !##;   ')); 
    console.log(chalk.blue('           !#$:%##########@&%|--$##$-   .|  $##$-!###!    -%@&.  '));
    console.log(chalk.blue('           !#$:!%%%%%277%%%%%%:.$##$-       $##$-!###!      :&#%-'));
    console.log(chalk.blue('&#############$-                             :!!: -!!!-        |@$'));
    console.log('                                      SCMK   '+ require('../package.json').version +'    By Knove');
}

exports = module.exports = showLogo;
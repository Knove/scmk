const chalk = require('chalk');

function showLogo() {
  console.log(chalk.blue(' :@##########$- ;##########@:  -$####&.  :@####$-!##$-   -$##%. '));
  console.log(chalk.blue(' :@##!          !###;          -$#####%  ;#####$-!##$-  !##@:  '));
  console.log(chalk.blue(' :@##;          %###;          -$##&$##; !#####$-!##%-.&##!   '));
  console.log(chalk.blue(' :@#########&! -$###;          -$##$:%#$;|#####$-!##@@##$-   '));
  console.log(chalk.blue(' :@##########$ .&###;          -$##$--&#&$#####$-!@@###!     '));
  console.log(chalk.blue('           !#$ :@###;          -$##$- :@###$$##$-!@@#%%#$-    '));
  console.log(chalk.blue('           !#$ ;####;          -$##$-  !##$!$##$-!###! :@#|   '));
  console.log(chalk.blue('           !#$ !####;          -$##$-  .%#! $##$-!###!   !##;   '));
  console.log(chalk.blue('           !#$ %##########@&%| -$##$-   .|  $##$-!###!    -%@&.  '));
  console.log(chalk.blue('           !#$ !%%%%%277%%%%%%:.$##$-       $##$-!###!      :&#%-'));
  console.log(chalk.blue('&#############                             :!!: -!!!-        |@$'));
  console.log(chalk.blue('————————————————————————————————————————————————————————————————'));
  console.log(`https://github.com/KnoveZ/scmk      SCMK   ${require('../package.json').version}    By Knove&Dee`);
  console.log(chalk.blue('————————————————————————————————————————————————————————————————'));
}

exports = module.exports = showLogo;

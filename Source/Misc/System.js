

const { os } = Deno.build;


if(os !== 'linux')
    throw `Currently only Linux is supported.`;


let dynamicExtension , usbPath;


switch(os){
case 'linux':
    dynamicExtension = 'so';
    usbPath = '/dev/ttyUSB0';
    break;
case 'windows':
    dynamicExtension = 'dll';
    usbPath = 'COM0';
    break;
case 'darwin':
    dynamicExtension = 'dylib';
    usbPath = '';
    break;
}


export default { dynamicExtension , usbPath };

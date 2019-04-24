module.exports={
    publicPath:'/listonosz/',
    chainWebpack: config => {
        config.module.rules.delete('eslint');
    }
}
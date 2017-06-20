# express-error-wrapper

The wrapper provide a way that you can handle error at one place, further more you can "return" `data` in express api handler.

## example
```
    import wrapRouter from './src'
    import {Router} from 'express'

    const router: Router = Router()

    router.route('/')
    .get((req)=>{
        return 'hello world ~'
        })
    .delete(()=>{
        throw 'catch you ~'
    })


    wrapRouter(router,{
        wrapReturnData(data){
            // data === 'hello world~'
            ....
            return data 
        },
        catchError(err){
            // err ===  'catch you ~'
            ...
            return err
        }
    })

```
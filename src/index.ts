/**!
 * 
 * Author: wangzixin 
 * Email: wangzixin1113@gmail.com
 */

/**
 * A wrapper for express api
 * 
 * @param router  Express Router instance
 * @param handler.wrapReturnData  wrap raw handler return DATA if exists, then pass to `res.json(data)`
 * @param handler.catchError  wrap error catch if thrown, then pass to `next(error)`
 */
export default function (router, { wrapReturnData, catchError }) {
    /**
     * 
     * @param route Express.router
     */
    function _wrapRoute(route) {
        for (let layer of route.stack) {
            _wrapLayerHandle(layer)
            if (layer.route) _wrapRoute(layer.route)
        }
    }

    /**
     * 
     * @param layer Express.layer
     */
    function _wrapLayerHandle(layer) {
        const rawHandle = layer.handle
        layer.handle = async function (req, res, next) {
            try {
                let data = await rawHandle(req, res, next)
                if (data) {
                    data = wrapReturnData ? wrapReturnData(data) : data
                    if (typeof data === 'object') {
                        res.json(data)
                    } else if (typeof data === 'string') {
                        res.end(data)
                    }
                }
            } catch (err) {
                next(catchError ? catchError(err) : err)
            }
        }
    }

    /**
     * wrap router
     */
    _wrapRoute(router)
}


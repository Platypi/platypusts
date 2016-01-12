module plat {
    'use strict';

    /**
     * Provides methods for interacting with geolocation services on a device.
     */
    export class Geolocation {
        protected static _inject: any = {
            _Promise: __Promise
        };

        protected _Promise: async.IPromise;

        /**
         * Attempts to acquire position information of the device.
         *
         * @param positionOptions Optional GeolocationPositionOptions for configuring the acquisition.
         * @returns {async.IThenable<GeolocationPosition, GeolocationPositionError>} A promise,
         * resolving when the position is found, and rejecting in the event of a position error.
         */
        getCurrentPosition(positionOptions?: GeolocationPositionOptions)
                : async.IThenable<GeolocationPosition> {
            return new this._Promise<GeolocationPosition>((resolve, reject): void => {
                navigator.geolocation.getCurrentPosition(resolve, reject, positionOptions);
            });
        }

        /**
         * An asynchronous operation for receiving notifications when a device location changes. Cannot return
         * a promise because the callbacks may be called multiple times.
         *
         * @param updateCallback A method that receives GeolocationPosition updates from the geolocation service.
         * @param errorCallback A method that receives GeolocationPositionError updates from the geolocation service.
         * @param positionOptions Optional GeolocationPositionOptions for configuring the acquisition.
         *
         * @returns {IRemoveListener} A method for removing the watch listener when the app wants to stop listening for position updates.
         */
        watchPosition(updateCallback: (position: GeolocationPosition) => void,
            errorCallback?: (error: PositionError) => void,
            positionOptions?: GeolocationPositionOptions): IRemoveListener;
        watchPosition(updateCallback: any, errorCallback?: any, positionOptions?: any): () => void {
            if (!isNull(errorCallback) && !isFunction(errorCallback)) {
                positionOptions = errorCallback;
                errorCallback = null;
            }

            let timeoutId = navigator.geolocation.watchPosition(updateCallback, errorCallback, positionOptions);

            return (): void => {
                navigator.geolocation.clearWatch(timeoutId);
            };
        }
    }

    register.injectable(__Geolocation, Geolocation);

    /* tslint:disable:interface-name */
    /**
     * Wrapper interface for the Position interface, adding documentation to
     * the members.
     */
    export interface GeolocationPosition extends Position {
        /**
         * Contains the GeolocationPositionCoordinates for the
         * position.
         */
        coords: GeolocationPositionCoordinates;

        /**
         * A number, representing when the position
         * was acquired.
         */
        timestamp: number;
    }

    /**
     * Wrapper interface for the PositionError interface, adding documentation
     * to the members.
     */
    export interface GeolocationPositionError extends PositionError, Error {
        /**
         * Returns the error code indicating whether the position is
         * unavailable, permission was denied, or a timeout occurred.
         */
        code: number;

        /**
         * Returns an error message containing the details of the error.
         */
        message: string;

        /**
         * The position acquisition failed because the position of the
         * device could not be found.
         * value = 2;
         */
        POSITION_UNAVAILABLE: number;

        /**
         * The position acquisition failed because the app does not have
         * sufficient permiossion to use the Geolocation service.
         * value = 1;
         */
        PERMISSION_DENIED: number;

        /**
         * The position acquisition failed because the timeout specified
         * in the position options was reached before the position could
         * be found.
         * value = 3;
         */
        TIMEOUT: number;
    }

    /**
     * Describes an object that stores coordinate information for a
     * geolocation position.
     */
    export interface GeolocationPositionCoordinates extends Coordinates {
        /**
         * Geographic latitude coordinate in decimal degrees.
         */
        latitude: number;

        /**
         * Geographic longitude coordinate in decimal degrees.
         */
        longitude: number;

        /**
         * Denotes the height of position in meters. Can be
         * null, indicating the device does not provide altitude
         * information.
         */
        altitude: number;

        /**
         * Provides the accuracy of the latitude and longitude
         * coordinates (in meters).
         */
        accuracy: number;

        /**
         * Denotes the accuracy of the altitude measurement (in meters).
         */
        altitudeAccuracy: number;

        /**
         * Denotes the direction in which the device is travelling in degrees.
         * Range is from 0 (North) to 360. If the device cannot provide heading
         * information, this value is null. If the device is not in motion, this
         * value is NaN.
         */
        heading: number;

        /**
         * Denotes the magnitude of the horizontal velocity vector (in meters/second).
         * Can be null, indicating the device does not provide speed information.
         */
        speed: number;
    }

    /**
     * Descibes the interface for position options sent to the Geolocation
     * services.
     */
    export interface GeolocationPositionOptions {
        /**
         * Specifies whether the app wants to get the most accurate position. This
         * can attribute to slower response times and increased power consumption.
         * Defaults to false.
         */
        enableHighAccuracy?: boolean;

        /**
         * Specifies the time (in milliseconds) alotted from when a geolocation
         * acquisition operation starts to when the value is returned. If it takes
         * longer than the timeout, an error will be thrown. Defaults to 0, meaning
         * there is no timeout.
         */
        timeout?: number;

        /**
         * Specifies that the app accepts cached position values when the age of the
         * value is less than the specified time (in milliseconds). Defaults to 0,
         * meaning the geolocation service needs to attempt to retrieve a new location
         * every time it is requested.
         */
        maximumAge?: number;
    }
    /* tslint:enable:interface-name */
}

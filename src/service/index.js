import {$apis} from 'helper'

export const getUserInfo = (params) => $apis.getProfile(params)

export const setUserInfo = (params) => $apis.setProfile(params)

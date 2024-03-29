const fs = require('fs');
const path = require('path');

/**
 * 设置定义
 * 注：validator 返回值 {pass: bool, message: str}
 */
module.exports = {
	sdk_root: {
		type: 'text',
		validator: (sdkPath) => {
			if(!fs.existsSync(sdkPath)) {
				return {pass: false, message: 'This path does not exist.'};
			}
			if(!fs.existsSync(path.join(sdkPath, 'build-tools')) ||
			!fs.existsSync(path.join(sdkPath, 'platform-tools'))) {
				return {pass: false, message: 'This path is not a valid SDK path.'};
			}
			return {pass: true, message: 'This path is valid.'};
		},
		validator_arg: ['sdk_root'],
		default: 'c:/android_sdk/'
	},
	cli_ver: {
		type: 'text',
		validator: (sdkPath, cliVer) => {
			if(!fs.existsSync(sdkPath)) {
				return {pass: true, message: 'SDK path does not exist.'};
			}
			if(!fs.existsSync(path.join(sdkPath, 'cmdline-tools/'))) {
				return {pass: false, message: 'Command-line tools not installed.'};
			}
			if(!fs.existsSync(path.join(sdkPath, 'cmdline-tools/', cliVer, 'bin/avdmanager'))) {
				return {pass: false, message: 'This version is not found.'};
			}
			return {pass: true, message: 'This version is valid.'};
		},
		validator_arg: ['sdk_root', 'cli_ver'],
		default: 'latest'
	},
	preexec: {
		type: 'text',
		validator: () => {
			return {pass: true, message: 'You can use this to set environment variables.'}
		},
		validator_arg: [],
		default: ''
	},
	emulator_args: {
		type: 'text',
		validator: () => {
			return {pass: true, message: 'Please do not include -writable-system.'}
		},
		validator_arg: [],
		default: ''
	},
	qemu_args: {
		type: 'text',
		validator: () => {
			return {pass: true, message: 'Arguments to pass to qemu core.'}
		},
		validator_arg: [],
		default: ''
	},
	func_reset_system: {
		type: 'bool',
		default: true
	},
	func_wipe_data: {
		type: 'bool',
		default: true
	},
	func_force_stop: {
		type: 'bool',
		default: true
	},
	func_writable_system: {
		type: 'bool',
		default: false
	}
};

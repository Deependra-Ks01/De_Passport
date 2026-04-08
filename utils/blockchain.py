import json
import os
from pathlib import Path

from dotenv import load_dotenv
from web3 import Web3


load_dotenv()


class BlockchainError(Exception):
    pass


BASE_DIR = Path(__file__).resolve().parent.parent
ABI_PATH = BASE_DIR / "contract" / "abi.json"
RPC_URL = os.getenv("GANACHE_RPC_URL", "http://127.0.0.1:7545")
CHAIN_ID = int(os.getenv("CHAIN_ID", "1337"))
DEFAULT_GAS = int(os.getenv("GAS_LIMIT", "3000000"))
DEFAULT_GAS_PRICE_GWEI = os.getenv("GAS_PRICE_GWEI", "20")

_web3 = Web3(Web3.HTTPProvider(RPC_URL))


def get_web3():
    return _web3


def is_connected():
    return bool(_web3.is_connected())


def _load_abi():
    with ABI_PATH.open("r", encoding="utf-8") as abi_file:
        return json.load(abi_file)


def _require_env(name):
    value = os.getenv(name)
    if not value:
        raise BlockchainError(f"Missing required environment variable: {name}")
    return value


def get_contract():
    contract_address = _require_env("CONTRACT_ADDRESS")
    try:
        checksum_address = _web3.to_checksum_address(contract_address)
    except ValueError as exc:
        raise BlockchainError("Invalid contract address configured.") from exc
    return _web3.eth.contract(address=checksum_address, abi=_load_abi())


def get_default_account():
    configured = os.getenv("GANACHE_ACCOUNT_ADDRESS")
    if configured:
        try:
            return _web3.to_checksum_address(configured)
        except ValueError as exc:
            raise BlockchainError("Invalid GANACHE_ACCOUNT_ADDRESS configured.") from exc

    accounts = _web3.eth.accounts
    if not accounts:
        raise BlockchainError("No Ganache accounts found.")
    return accounts[0]


def _build_transaction():
    sender = get_default_account()
    return {
        "from": sender,
        "nonce": _web3.eth.get_transaction_count(sender),
        "gas": DEFAULT_GAS,
        "gasPrice": _web3.to_wei(DEFAULT_GAS_PRICE_GWEI, "gwei"),
        "chainId": CHAIN_ID,
    }


def _send_transaction(transaction_builder):
    if not is_connected():
        raise BlockchainError(f"Unable to connect to Ganache at {RPC_URL}")

    private_key = _require_env("GANACHE_PRIVATE_KEY")
    account = get_default_account()
    txn = transaction_builder.build_transaction(_build_transaction())
    signed_txn = _web3.eth.account.sign_transaction(txn, private_key=private_key)
    tx_hash = _web3.eth.send_raw_transaction(signed_txn.raw_transaction)
    receipt = _web3.eth.wait_for_transaction_receipt(tx_hash)
    if receipt.status != 1:
        raise BlockchainError("Blockchain transaction failed.")
    return receipt


def issue_passport(user_address, passport_hash):
    contract = get_contract()
    checksum_user = _web3.to_checksum_address(user_address)
    return _send_transaction(contract.functions.issuePassport(checksum_user, passport_hash))


def revoke_passport(user_address):
    contract = get_contract()
    checksum_user = _web3.to_checksum_address(user_address)
    return _send_transaction(contract.functions.revokePassport(checksum_user))


def verify_passport_on_chain(user_address, passport_hash):
    if not is_connected():
        raise BlockchainError(f"Unable to connect to Ganache at {RPC_URL}")
    contract = get_contract()
    checksum_user = _web3.to_checksum_address(user_address)
    return contract.functions.verifyPassport(checksum_user, passport_hash).call()

<?php
/**
 * NedNetwork | NedNetwork blockchain - https://izzz.io
 * @author: Andrey Nedobylsky (admin@twister-vl.ru)
 */


class EcmaSmartRPC extends NodeRPC
{
    const METHODS = parent::METHODS + [
        'contracts/ecma/getInfo'             => ['httpMethod' => 'get'],
        'contracts/ecma/contractExists'    => ['httpMethod' => 'get'],
        'contracts/ecma/getContractInfo'     => ['httpMethod' => 'get'],
        'contracts/ecma/getContractProperty' => ['httpMethod' => 'get'],
        'contracts/ecma/callMethod'          => ['httpMethod' => 'post'],
        'contracts/ecma/deployMethod'        => ['httpMethod' => 'post'],
        'contracts/ecma/deployContract'      => ['httpMethod' => 'post'],
    ];

    /**
     * Get ECMAScript Smart Contracts subsystem info
     * @return array|mixed
     * @throws InvalidMethodException
     * @throws ReturnException
     * @throws RpcCallException
     */
    public function ecmaGetInfo()
    {
        return $this->request('contracts/ecma/getInfo');
    }

    /**
     * Check is contract exists
     * @param string $contractAddress
     * @return boolean
     * @throws InvalidMethodException
     * @throws ReturnException
     * @throws RpcCallException
     */
    public function ecmaContractExists($contractAddress)
    {
        return $this->request('contracts/ecma/contractExists', [], '/' . $contractAddress);
    }

    /**
     * Get info about contract
     * @param string $contractAddress
     * @return array|mixed
     * @throws InvalidMethodException
     * @throws ReturnException
     * @throws RpcCallException
     */
    public function ecmaGetContractInfo($contractAddress)
    {
        return $this->request('contracts/ecma/getContractInfo', [], '/' . $contractAddress);
    }

    /**
     * Get contract property value
     * @param string $contractAddress
     * @param string $property
     * @return array|mixed
     * @throws InvalidMethodException
     * @throws ReturnException
     * @throws RpcCallException
     */
    public function ecmaGetContractProperty($contractAddress, $property)
    {
        return $this->request('contracts/ecma/getContractProperty', [], '/' . $contractAddress . '/' . $property);
    }

    /**
     * Call contract method without deploy
     * @param string $contractAddress
     * @param string $method
     * @param array $params
     * @return array|mixed
     * @throws InvalidMethodException
     * @throws ReturnException
     * @throws RpcCallException
     */
    public function ecmaCallMethod($contractAddress, $method, $params)
    {
        return $this->request('contracts/ecma/callMethod', ['argsEncoded' => json_encode($params)], '/' . $contractAddress . '/' . $method);
    }

    /**
     * Deploy contract method
     * @param string $contractAddress
     * @param string $method
     * @param array $params
     * @return array|mixed
     * @throws InvalidMethodException
     * @throws ReturnException
     * @throws RpcCallException
     */
    public function ecmaDeployMethod($contractAddress, $method, $params)
    {
        return $this->request('contracts/ecma/deployMethod', ['argsEncoded' => json_encode($params)], '/' . $contractAddress . '/' . $method);
    }

    /**
     * Deploy new contract
     * @param string $source
     * @param string $resourceRent
     * @return array|mixed
     * @throws InvalidMethodException
     * @throws ReturnException
     * @throws RpcCallException
     */
    public function ecmaDeployContract($source, $resourceRent = '0')
    {
        return $this->request('contracts/ecma/deployContract', ['source' => $source, 'resourceRent' => $resourceRent]);
    }

    /**
     * Deploy new contract with signed block
     * @param array $block
     * @param string $resourceRent
     * @return array|mixed
     * @throws InvalidMethodException
     * @throws ReturnException
     * @throws RpcCallException
     */
    public function ecmaDeployContractSignedBlock($block, $resourceRent = '0')
    {
        return $this->request('contracts/ecma/deployContract', ['source'       => json_encode($block),
                                                                'resourceRent' => $resourceRent,
        ]);
    }

    /**
     * Deploy contract method with signed block
     * @param string $contractAddress
     * @param array $block
     * @return array|mixed
     * @throws InvalidMethodException
     * @throws ReturnException
     * @throws RpcCallException
     */
    public function ecmaDeployMethodSignedBLock($contractAddress, $block)
    {
        return $this->request('contracts/ecma/deploySignedMethod', ['source' => json_encode($block)], '/' . $contractAddress);
    }
}

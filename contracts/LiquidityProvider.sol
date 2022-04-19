// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./interfaces/IUniswapV2Router.sol";
import "./interfaces/IUniswapV2Factory.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract LiquidityProvider {

    // uniswapFactory on Rinkeby Testnet
    address public uniswapFactory = 0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f;
    // UniswapV2Router v02 on Rinkeby Testnet
    address public uniswapRouter = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;

    // constructor(address _uniswapFactory, address _uniswapRouter) {

    // }

    event AddLiquidityEvent(
        address admin,
        uint256 anountA,
        uint256 amountB,
        uint256 liquidity
    );
    event RemoveLiquidityEvent(address admin, uint256 anountA, uint256 amountB);

    // Add Liquidity
    function addLiquidity(
        address _tokenA,
        address _tokenB,
        uint256 _amountA,
        uint256 _amountB
    ) external {
        approveTokenSpend(_tokenA, _tokenB, _amountA, _amountB);
        transferToken(_tokenA, _tokenB, _amountA, _amountB);
        (
            uint256 amountTokenA,
            uint256 amountTokenB,
            uint256 liquidity
        ) = IUniswapV2Router(uniswapRouter).addLiquidity(
                _tokenA,
                _tokenB,
                _amountA,
                _amountB,
                1,
                1,
                address(this),
                block.timestamp
            );

        emit AddLiquidityEvent(
            msg.sender,
            amountTokenA,
            amountTokenB,
            liquidity
        );
    }

    // remove liquidity
    function removeLiquidity(address _tokenA, address _tokenB) external {

        address tokenPair = IUniswapV2Factory(uniswapFactory).getPair(
            _tokenA,
            _tokenB
        );

        uint256 totalLiquidity = ERC20(tokenPair).balanceOf(address(this));
        ERC20(tokenPair).approve(uniswapRouter, totalLiquidity);

        (uint256 amountTokenA, uint256 amountTokenB) = IUniswapV2Router(uniswapRouter).removeLiquidity(
            _tokenA,
            _tokenB,
            totalLiquidity,
            1,
            1,
            address(this),
            block.timestamp
        );
        
        emit RemoveLiquidityEvent(msg.sender, amountTokenA, amountTokenB);
    }

    // token aloowance
    function approveTokenSpend(
        address _tokenA,
        address _tokenB,
        uint256 _amountA,
        uint256 _amountB
    ) internal {
        ERC20(_tokenA).approve(uniswapRouter, _amountA);
        ERC20(_tokenB).approve(uniswapRouter, _amountB);
    }

    // token transfer
    function transferToken(
        address _tokenA,
        address _tokenB,
        uint256 _amountA,
        uint256 _amountB
    ) internal {
        ERC20(_tokenA).transferFrom(msg.sender, address(this), _amountA);
        ERC20(_tokenB).transferFrom(msg.sender, address(this), _amountB);
    }
}

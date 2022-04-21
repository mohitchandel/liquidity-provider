// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "./interfaces/IUniswapV2Router.sol";
import "./interfaces/IUniswapV2Factory.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "./FirstToken.sol";
import "./SecondToken.sol";

contract UniswapTest {
    using SafeERC20 for ERC20;

    ERC20 public tokenA;
    ERC20 public tokenB;

    // uniswapFactory on Rinkeby Testnet
    address public uniswapFactory = 0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f;
    // UniswapV2Router v02 on Rinkeby Testnet
    address public uniswapRouter = 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;

    constructor(ERC20 _tokenA, ERC20 _tokenB) {
        tokenA = _tokenA;
        tokenB = _tokenB;
    }

    receive() external payable {}

    event AddLiquidityEvent(
        address admin,
        uint256 anountA,
        uint256 amountB,
        uint256 liquidity
    );
    event RemoveLiquidityEvent(address admin, uint256 anountA, uint256 amountB);
    event TokenSwapEvent(uint256[] amounts);

    // Add Liquidity
    function addLiquidity(uint256 _amountA, uint256 _amountB) external {
        transferToken(tokenA, tokenB, _amountA, _amountB);
        approveTokenSpend(tokenA, tokenB);

        (
            uint256 amountTokenA,
            uint256 amountTokenB,
            uint256 liquidity
        ) = IUniswapV2Router(uniswapRouter).addLiquidity(
                address(tokenA),
                address(tokenB),
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

        (uint256 amountTokenA, uint256 amountTokenB) = IUniswapV2Router(
            uniswapRouter
        ).removeLiquidity(
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

    function swapTokens(uint256 _tokenAmount, address _tokenA, address _tokenB) external payable {
        address[] memory path;
        path = new address[](2);
        path[0] = _tokenA;
        path[1] = _tokenB;

        ERC20(_tokenA).transferFrom(msg.sender, address(this), _tokenAmount);
        ERC20(_tokenA).approve(uniswapRouter, _tokenAmount);
        
        uint amountOut = IUniswapV2Router(uniswapRouter).getAmountsOut(
            _tokenAmount,
            path
        )[1];
        
        (uint[] memory amounts) = IUniswapV2Router(uniswapRouter).swapExactTokensForTokens(
            _tokenAmount, 
            amountOut,
            path, 
            msg.sender, 
            block.timestamp
            );
        emit TokenSwapEvent(amounts);
    }

    function swapEThforTokens(uint256 _ethAmount, address _tokenAddress)
        external
        payable
    {   
        address[] memory path;
        path = new address[](2);
        path[0] = IUniswapV2Router(uniswapRouter).WETH();
        path[1] = _tokenAddress;

        uint256 amountOut = IUniswapV2Router(uniswapRouter).getAmountsOut(
            _ethAmount,
            path
        )[0];

        uint256[] memory amounts = IUniswapV2Router(uniswapRouter)
            .swapExactETHForTokens{value: msg.value}(
            amountOut,
            path,
            msg.sender,
            block.timestamp
        );
        emit TokenSwapEvent(amounts);
    }

    // token aloowance
    function approveTokenSpend(ERC20 _tokenA, ERC20 _tokenB) internal {
        ERC20(_tokenA).safeApprove(uniswapRouter, (2**256 - 1));
        ERC20(_tokenB).safeApprove(uniswapRouter, (2**256 - 1));
    }

    // token transfer
    function transferToken(
        ERC20 _tokenA,
        ERC20 _tokenB,
        uint256 _amountA,
        uint256 _amountB
    ) internal {
        ERC20(_tokenA).transferFrom(msg.sender, address(this), _amountA);
        ERC20(_tokenB).transferFrom(msg.sender, address(this), _amountB);
    }
}

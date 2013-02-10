<?php include_once('/var/www/inc/header.php'); ?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="content-type" content="text/html; charset=utf-8" />
		<title>Free Worlds Union</title>
		<meta name="keywords" content="" />
		<meta name="description" content="" />
		<link href="/css/main_page.css" rel="stylesheet" type="text/css" media="screen" />
		<script language="javascript" src="/fwurg-lib/libs/jquery-1.7.2.min.js"></script>
		<script language="javascript" src="/fwurg-lib/fwurg.js"></script>
		<script language="javascript" src="/fwurg-lib/fwurg.icons.js"></script>
		<script language="javascript" src="open_market.js"></script>
		<?php FWURG::get()->header->head(); ?>
		<link href="open_market.css" rel="stylesheet" type="text/css" media="screen" />
		<script type="application/javascript">fwurg.url=function(r){return "/fwurg-lib/"+r;};</script>
	</head>
	<body onload="<?php FWURG::get()->header->onload(); ?>">
		<?php FWURG::get()->header->html(); ?>
		<div id="page">
			<div id="pageleft">
				<div id="content">
				<?php FWURG::getBreadcrumbs()->tool('/tools/open-market/', 'Open Market Tool'); ?>
					<div class="post">
						<h2 class="title"><a href="#">Open Market Tool</a></h2>
						<p>Use Negative amounts for buying goods. For example -50 for buying 50 goods. If your total tax is negative you have to pay to the open market.</p>
					</div>
					<div id="loadbar"></div>
					<div id="omTool" style="display: none">
						<table id="allGoods"></table>
					</div>
				</div>
			</div>
		</div>
	</body>
</html>

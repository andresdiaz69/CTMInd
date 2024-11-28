# View: vw_Seedz_Invoices_Items

## Usa los objetos:
- [[ComisionesSpigaAlmacenAlbaran]]
- [[ComisionesSpigaTallerPorOT]]
- [[Spiga_Terceros]]
- [[vw_Seedz_Items]]
- [[vw_Seedz_Notas_Credito]]
- [[vw_Seedz_Sellers]]

```sql

CREATE view [dbo].[vw_Seedz_Invoices_Items] as
select Num=ROW_NUMBER() over(order by a.cnpjOrigemDados  asc),
Id = convert(varchar,a.Id)+ '-' + convert(varchar,row_number()over(partition by a.cnpjOrigemDados order by a.cnpjOrigemDados)), 

ISNULL(a.cnpjOrigemDados,'') AS cnpjOrigemDados, -- JCS: 25/04/2023 (CONCATENAR EL NIT CON EL CÓDIGO DEL CENTRO) 

a.dataCadastro, a.dataAtualizacao, IdCliente, Numero=numeroNotaFiscalFaturamento, Serie=serieNotaFiscalFaturamento, 
dataEmissao=dataEmissaoFaturamento,IdStatus=2,statusNotaFiscalFaturamento, idPedido, dataPedido,
Tipo = case when sum(vlrTotalProdutosFaturamento) < 0 then 0 else 1 end,DocumentoCliente=NitCliente,
idNotaFiscalOrigem = a.id,--case when sum(vlrTotalProdutosFaturamento) < 0 then nc.FactOrigen else ' ' end,
notaFiscalOrigem = case when sum(vlrTotalProdutosFaturamento) < 0 then numeroNotaFiscalFaturamento else ' ' end,
IdItem = Referencia,descricaoItem= Descripcion,brandingItem= Marca,skuItem=Referencia,
unidadeMedidaItem=i.um,quantidadeItem=UnidadesVendidas,valorUnitarioItem=ValorUnitario,
valorTotalItem=vlrTotalProdutosFaturamento,CpfCliente=NitCliente,cpfVendedor=Vendedor,Categoria=Clasificacion1,
idVendedores=isnull(IdVendedor,' ')
FROM(
	SELECT Id,cnpjOrigemDados,dataCadastro,dataAtualizacao,IdCliente,numeroNotaFiscalFaturamento,serieNotaFiscalFaturamento,
	dataEmissaoFaturamento,statusNotaFiscalFaturamento,vlrTotalProdutosFaturamento=sum(vlrTotalProdutosFaturamento),
	valorTotalNotaFiscalFaturamento=sum(valorTotalNotaFiscalFaturamento),IdPedido,Datapedido,UnidadesVendidas=sum(UnidadesVendidas),ValorUnitario,Nitcliente,
	Vendedor,Clasificacion1,IdVendedor,Referencia,Descripcion,Marca
	FROM (
			select Id = replace(a.NumeroFactura,'\',''),

			cnpjOrigemDados='8300049938' + '_' + CAST(a.codigoCentro as varchar(4)), -- JCS: 25/04/2023 (CONCATENAR EL NIT CON EL CÓDIGO DEL CENTRO)

			dataCadastro=a.FechaFactura,dataAtualizacao=a.FechaFactura,
			IdCliente= t.PkTerceros,
			numeroNotaFiscalFaturamento=substring(NumeroFactura,charindex('\',NumeroFactura,1)+1,charindex('\',NumeroFactura,
			charindex('\',NumeroFactura,1)+1)-charindex('\',NumeroFactura,1)-1),
			serieNotaFiscalFaturamento=substring(NumeroFactura,1,charindex('\',NumeroFactura,1)-1),
			dataEmissaoFaturamento= FechaFactura,statusNotaFiscalFaturamento='Concluida',
			vlrTotalProdutosFaturamento=((UnidadesVendidas*ValorUnitarioReferencia)-((UnidadesVendidas*ValorUnitarioReferencia)*PorcDescuento)/100),
			valorTotalNotaFiscalFaturamento=ValorNeto+Impuestos,
			--tipoFaturamento= case when UnidadesVendidas < 0 then 'D' else 'S' end,
			IdPedido = NumeroAlbaran,Datapedido= FechaFactura,
			Referencia,Descripcion=DescripcionReferencia,Marca,UnidadesVendidas,ValorUnitario=ValorUnitarioReferencia,Nitcliente,
			Vendedor=CedulaVendedorRepuestos,Clasificacion1=Clasificacion1Mov,IdVendedor=v.Id
			from		ComisionesSpigaAlmacenAlbaran		a
			left join (select PkTerceros,NifCif
			from(
				select PkTerceros,NifCif,FechaAlta,FechaMod,orden=row_number() over(partition by NifCif order by FechaAlta,FechaMod desc) 
				from 	[PSCService_DB].dbo.Spiga_Terceros
				--where NifCif = '8913048494'
			)a where orden = 1)								t	on	a.Nitcliente = t.NifCif
			--left join	[PSCService_DB].dbo.Spiga_Terceros	t	on	a.Nitcliente = t.NifCif
			left join	vw_Seedz_Sellers					v	on	a.CedulaVendedorRepuestos = v.documento
			where a.Centro like 'JD-%'
			and a.CodigoEmpresa = 1
			--and a.Ano_Periodo = 2021
			--and a.Mes_Periodo = 12
			--and a.NumeroFactura like '%C14%'
			--and a.NumeroFactura like '%1032%'
			UNION ALL
			select Id = replace(a.NumeroFacturaTaller,'\',''),

			cnpjOrigemDados='8300049938' + '_' + CAST(a.codigoCentro as varchar(4)), -- JCS: 25/04/2023 (CONCATENAR EL NIT CON EL CÓDIGO DEL CENTRO)

			dataCadastro=a.FechaFactura,dataAtualizacao=a.FechaFactura,
			IdCliente= t.PkTerceros,
			numeroNotaFiscalFaturamento = substring(NumeroFacturaTaller,charindex('\',NumeroFacturaTaller,charindex('\',NumeroFacturaTaller,1)+1)+1,9),
			serieNotaFiscalFaturamento = substring(NumeroFacturaTaller,charindex('\',NumeroFacturaTaller,1)+1,charindex('\',NumeroFacturaTaller,
			charindex('\',NumeroFacturaTaller,1)+1)-charindex('\',NumeroFacturaTaller,1)-1),
			dataEmissaoFaturamento= FechaFactura,statusNotaFiscalFaturamento='Concluida',
			vlrTotalProdutosFaturamento=((UnidadesVendidas*ValorUnitario)-((UnidadesVendidas*ValorUnitario)*PorcentajeDescuento)/100),
			valorTotalNotaFiscalFaturamento=ValorNeto+ImporteImpuesto,
			--tipoFaturamento= case when UnidadesVendidas < 0 then 'D' else 'S' end,
			IdPedido = NumOT,Datapedido= FechaFactura,
			referencia=Codigo,descripcion, Marca = isnull(Marca,'MO'),UnidadesVendidas,ValorUnitario,Nitcliente,
			Vendedor=a.CedulaAsesorServicioResponsable,Clasificacion1=DescripClas1,IdVendedor=v.Id
			from		ComisionesSpigaTallerPorOT			a
			left join (select PkTerceros,NifCif
			from(
				select PkTerceros,NifCif,FechaAlta,FechaMod,orden=row_number() over(partition by NifCif order by FechaAlta,FechaMod desc) 
				from 	[PSCService_DB].dbo.Spiga_Terceros
				--where NifCif = '8913048494'
			)a where orden = 1)								t	on	a.Nitcliente = t.NifCif

			--left join	[PSCService_DB].dbo.Spiga_Terceros	t	on	a.Nitcliente = t.NifCif
			left join	vw_Seedz_Sellers					v	on	a.CedulaAsesorServicioResponsable = v.documento
			where a.Centro like 'JD-%'
			and a.CodigoEmpresa = 1
			--and a.Ano_Periodo = 2021
			--and a.Mes_Periodo = 12
			--and a.NumeroFacturaTaller like '%C14%'
			--and a.NumeroFacturaTaller like '%1032%'
	)b	
	group by Id,cnpjOrigemDados,dataCadastro,dataAtualizacao,IdCliente,numeroNotaFiscalFaturamento,serieNotaFiscalFaturamento,dataEmissaoFaturamento,
	statusNotaFiscalFaturamento,IdPedido,Datapedido,ValorUnitario,Nitcliente,Vendedor,Clasificacion1,IdVendedor,referencia,Descripcion,marca
	having sum(vlrTotalProdutosFaturamento) <> 0
)a	left join	vw_Seedz_Items			i	on	a.Referencia = i.Id 
	left join	vw_Seedz_Notas_Credito	nc	on	a.id=NC
group by a.Id, a.cnpjOrigemDados, a.dataCadastro, a.dataAtualizacao, idCliente, numeroNotaFiscalFaturamento, serieNotaFiscalFaturamento, 
dataEmissaoFaturamento, statusNotaFiscalFaturamento, idPedido, dataPedido,referencia,descripcion,marca,Um,
UnidadesVendidas,ValorUnitario,vlrTotalProdutosFaturamento,NitCliente,Vendedor,Clasificacion1,IdVendedor,nc.FactOrigen

```

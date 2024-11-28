# View: vw_Seedz_Invoices

## Usa los objetos:
- [[ComisionesSpigaAlmacenAlbaran]]
- [[ComisionesSpigaTallerPorOT]]
- [[Spiga_Terceros]]

```sql

CREATE  view [dbo].[vw_Seedz_Invoices] as
select  Num=ROW_NUMBER() over(order by cnpjOrigemDados  asc),
Id, 

ISNULL(cnpjOrigemDados,'') AS cnpjOrigemDados, -- JCS: 25/04/2023 (CONCATENAR EL NIT CON EL CÓDIGO DEL CENTRO) 

dataCadastro, dataAtualizacao, idCliente, numeroNotaFiscalFaturamento, serieNotaFiscalFaturamento, 
dataEmissaoFaturamento,IdStatus=2, statusNotaFiscalFaturamento, DocumentoCliente=Nitcliente,
vlrTotalProdutosFaturamento=sum(vlrTotalProdutosFaturamento), 
valorTotalNotaFiscalFaturamento=sum(valorTotalNotaFiscalFaturamento),
tipoFaturamento = case when sum(valorTotalNotaFiscalFaturamento) < 0 then 'D' else 'S' end 
FROM(
	select  Id = replace(a.NumeroFactura,'\',''),
	
	cnpjOrigemDados='8300049938' + '_' + CAST(a.codigoCentro as varchar(4)), -- JCS: 25/04/2023 (CONCATENAR EL NIT CON EL CÓDIGO DEL CENTRO)

	dataCadastro=a.FechaFactura,dataAtualizacao=a.FechaFactura,
	IdCliente= t.PkTerceros,
	numeroNotaFiscalFaturamento=substring(NumeroFactura,charindex('\',NumeroFactura,1)+1,charindex('\',NumeroFactura,
	charindex('\',NumeroFactura,1)+1)-charindex('\',NumeroFactura,1)-1),
	serieNotaFiscalFaturamento=substring(NumeroFactura,1,charindex('\',NumeroFactura,1)-1),
	dataEmissaoFaturamento= FechaFactura,statusNotaFiscalFaturamento='Concluida',
	vlrTotalProdutosFaturamento=((UnidadesVendidas*ValorUnitarioReferencia)-((UnidadesVendidas*ValorUnitarioReferencia)*PorcDescuento)/100),
	valorTotalNotaFiscalFaturamento=ValorNeto+Impuestos,
	--tipoFaturamento = case when UnidadesVendidas < 0 then 'D' else 'S' end,
	a.Nitcliente
	from		ComisionesSpigaAlmacenAlbaran		a
	left join (select PkTerceros,NifCif
			from(
				select PkTerceros,NifCif,FechaAlta,FechaMod,orden=row_number() over(partition by NifCif order by FechaAlta,FechaMod desc) 
				from 	[PSCService_DB].dbo.Spiga_Terceros
				--where NifCif = '8913048494'
			)a where orden = 1)								t	on	a.Nitcliente = t.NifCif
	--left join	[PSCService_DB].dbo.Spiga_Terceros	t	on	a.Nitcliente = t.NifCif
	where a.Centro like 'JD-%'
	and a.CodigoEmpresa = 1
	--and a.Ano_Periodo = 2021
	--and a.Mes_Periodo = 11
	--and a.NumeroFactura like '%CRE%'
	--and a.NumeroFactura like '%910%'
	UNION ALL
	select  Id = replace(a.NumeroFacturaTaller,'\',''),
	
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
	a.Nitcliente
	from		ComisionesSpigaTallerPorOT			a
	left join (select PkTerceros,NifCif
			from(
				select PkTerceros,NifCif,FechaAlta,FechaMod,orden=row_number() over(partition by NifCif order by FechaAlta,FechaMod desc) 
				from 	[PSCService_DB].dbo.Spiga_Terceros
				--where NifCif = '8913048494'
			)a where orden = 1)								t	on	a.Nitcliente = t.NifCif
	--left join	[PSCService_DB].dbo.Spiga_Terceros	t	on	a.Nitcliente = t.NifCif
	where a.Centro like 'JD-%'
	and a.CodigoEmpresa = 1
	--and a.Ano_Periodo = 2021
	--and a.Mes_Periodo = 11
	--and a.NumeroFacturaTaller like '%CRE%'
	--and a.NumeroFacturaTALLER like '%910%'
)a group by Id, cnpjOrigemDados, dataCadastro, dataAtualizacao, idCliente, numeroNotaFiscalFaturamento, serieNotaFiscalFaturamento, 
dataEmissaoFaturamento, statusNotaFiscalFaturamento, Nitcliente

```

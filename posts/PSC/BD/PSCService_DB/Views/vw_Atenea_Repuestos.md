# View: vw_Atenea_Repuestos

## Usa los objetos:
- [[ComisionesSpigaAlmacenAlbaran]]
- [[UnidadDeNegocio]]
- [[vw_Atenea_Terceros]]

```sql
CREATE view [dbo].[vw_Atenea_Repuestos] as
--JCS: 19/10/2023 - SE AGREGA LA COLUMNA pkterceros
--MS: 281123 se quitan duplicados, se cmabian los campos de las marcas y se ajustar el campo referencia para que salga valor mas alto por factura
--MS: 041223 se quitan las empresas nuestras y se agregan los cmapos codigo empresa y nombre empresa 
select distinct pkterceros,        Nombre_completo,   NitCliente,          Direccion_principal,   Telefono1,
       telefono2,                  celular1,         email_principal,      ciudadPrincipal,
	   TipoMov ,                   DescripcionReferencia Referencia,       fechafactura,          NombreVendedorRepuestos,
	   CedulaVendedorRepuestos,    Centro,           CodigoCentro,    	   CodOrdenServicio='Null', 
	   idMarca = mr.Sigla, 	       Marca= mr.NombreUnidadNegocio,          CodigoEmpresa, Empresa NombreEmpresa

  from (select NumeroFactura,FechaFactura, NitCliente,TipoMov, NombreVendedorRepuestos, CedulaVendedorRepuestos,CodigoEmpresa,Empresa,
       Centro,CodigoCentro, DescripcionReferencia, ValorNeto,  CodigoSeccion,
	   orden = ROW_NUMBER() over(partition by NumeroFactura order by ValorNeto desc)
  from [DBMLC_0190]..ComisionesSpigaAlmacenAlbaran )      cs
 inner join (select NumeroFactura,SUM(ValorNeto)vr
               from [DBMLC_0190]..ComisionesSpigaAlmacenAlbaran
			  group by NumeroFactura) c on c.NumeroFactura = cs.NumeroFactura
  left join vw_Atenea_Terceros       tc on tc.Nifcif = cs.NitCliente
  left join [DBMLC_0190]..UnidadDeNegocio mr on mr.CodCentro = cs.CodigoCentro
                                             and mr.CodEmpresa = cs.CodigoEmpresa
											 and mr.CodSeccion = cs.CodigoSeccion

  where orden =1
  and vr >0
  and TipoMov not like('%A')
  and TipoMov<>'VIN'
  and tc.nifcif not in ('8300049938','9005736668','9013893271','9002830997','9003539391','8600190638','9003362494')
  --and YEAR(FechaFactura)=2023
  --and MONTH (FechaFactura)=10
  --and NumeroFactura = 'R002\117690\2023'

```

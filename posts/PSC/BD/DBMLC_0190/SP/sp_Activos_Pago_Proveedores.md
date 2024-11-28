# Stored Procedure: sp_Activos_Pago_Proveedores

## Usa los objetos:
- [[Empresas]]
- [[spiga_Terceros]]
- [[spiga_TercerosBancosProveedores]]
- [[spiga_TercerosCorreos]]

```sql
--DROP PROCEDURE sp_Activos_Pago_Proveedores
CREATE PROCEDURE sp_Activos_Pago_Proveedores 
@fechaInicial datetime 
 , @fechaFinal datetime  AS
SELECT DISTINCT NombreEmpresa, Nombre_Beneficiario, Tipo_Identificacion, NIT, Cuenta_Entidad, Numero_Cuenta, Tipo_Cuenta, Email  
FROM(
	 SELECT Empresa, Codigo_Tercero=a.PkTerceros, NIT=a.NifCif, Numero_Cuenta=CuentaNumero, Cuenta_Entidad, NombreEmpresa=c.NombreEmpresa
	 , Email=a.email, Nombre_Beneficiario=nombreTercero, Tipo_Cuenta, Tipo_Identificacion=CASE WHEN FkTerceroClases=1 THEN 'CC' ELSE 'NIT' END
	 , FechaAlta=CONVERT(datetime,FechaAlta), FechaMod=CONVERT(datetime,FechaMod)
	 FROM(
		  SELECT DISTINCT
		  NifCif, email, PkTerceros, FkTerceroClases, NombreComercial, nomb2=nombre +' '+ Apellido1+' ' +Apellido2, FechaMod, FechaAlta
		  , nombreTercero=CASE WHEN NombreComercial ='.' THEN nombre ELSE isnull(convert(varchar,NombreComercial),convert(varchar,isnull(nombre,''))
		  +' '+convert(varchar,isnull(Apellido1,'')) +' '+convert(varchar,isnull(Apellido2,''))) END FROM(SELECT orden=row_number() over 
		  (PARTITION BY nifcif ORDER BY fechamod DESC) , NifCif, PkTerceros, Nombre, NombreComercial, Apellido1 , Apellido2, FkTerceroClases
		  , FechaMod =CONVERT(DATE,FechaMod), FechaAlta=CONVERT(DATE,FechaAlta)
		  FROM [PSCService_DB].dbo.spiga_Terceros) a LEFT JOIN (SELECT DISTINCT PkFkTerceros, email FROM( SELECT orden=row_number() over
		  (PARTITION BY PkFkTerceros ORDER BY FechaMod DESC), PkFkTerceros,email FROM [PSCService_DB].dbo.spiga_TercerosCorreos WHERE Principal = 1 )a 
		  WHERE orden = 1) b ON a.PkTerceros=b.PkFkTerceros WHERE orden = 1) a
		  INNER JOIN (SELECT DISTINCT PkTerceros, NifCif, CuentaNumero, Cuenta_Entidad=Nombre, Tipo_Cuenta=descripcion, Empresa=pfkempresas
					  FROM [PSCService_DB].[dbo].spiga_TercerosBancosProveedores ) b ON a.NifCif=b.NifCif
          LEFT JOIN (SELECT CodigoEmpresa, NombreEmpresa FROM [DBMLC_0190].dbo.Empresas )c ON b.Empresa=c.CodigoEmpresa
		  WHERE FechaMod >= @fechaInicial and FechaMod <= @fechaFinal
)a
WHERE Empresa IN (1,5,6,24) AND Nombre_Beneficiario <> '' AND Cuenta_Entidad IS NOT NULL AND Tipo_Cuenta IS NOT NULL AND Email IS NOT NULL
```

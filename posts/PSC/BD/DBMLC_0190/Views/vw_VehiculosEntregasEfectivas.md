# View: vw_VehiculosEntregasEfectivas

## Usa los objetos:
- [[ComisionesSpigaVN]]
- [[spiga_Vehiculos]]
- [[vw_Terceros_Consolidado]]

```sql
CREATE VIEW [dbo].[vw_VehiculosEntregasEfectivas] AS
--MS: 060923 -- se remplaza la tabla de terceros SpigaFichaLlamadaAgendamientoDatosTerceroFechaAlta por la vista vw_Terceros_Consolidado y se quito el group by
--MS: 060923 --se quita una de las subconsultas de vehiculos ya que no es necesaria y reduce tiempo
select  d.Ano_Periodo,d.Mes_Periodo,Codigoempresa,Empresa,CodigoCentro,Centro,d.VIN,d.CodigoMarca,marca,d.CodigoGama,gama,d.AñoModelo,modelo,nit,nombreTercero,EmailCliente,
       CiudadCliente,CelularCliente,FijoCliente,FechaEntregaCliente,p.placa
  from (SELECT distinct a.Ano_Periodo, a.Mes_Periodo,a.CodigoEmpresa, a.Empresa, a.CodigoCentro, a.Centro, a.VIN, a.CodigoMarca, a.Marca, a.CodigoGama, a.Gama, a.AñoModelo, a.Modelo, a.Nit, 
			   a.NombreTercero, EmailCliente = b.Email, CiudadCliente = b.Poblacion, CelularCliente = b.Celular, FijoCliente = b.Fijo, FechaEntregaCliente = a.FechaEntregaCliente
				--, DepartamentoCliente = b.Poblacion
		  FROM ComisionesSpigaVN AS a
		  LEFT JOIN (
					SELECT NifCif,            email_principal email,          celular1 Celular,
					       TelPrincipal Fijo, ciudadPrincipal Poblacion,      Fecha_Alta FechaAlta 
					FROM vw_Terceros_Consolidado					
					) AS b ON a.Nit = b.NifCif

		WHERE a.EntregaEfectiva = 1
		--and a.vin = '1CQ740DAJP0146186'
		--and a.Mes_Periodo = 7
		--and a.Ano_Periodo = 2019
		--AND A.CodigoMarca = 22
      ) d left join (select orden = row_number() over (partition by vin order by FechaDeActualizacion desc),placa,vin
				       from [PSCService_DB].[dbo].[spiga_Vehiculos]				            
					--where vin = '1CQ740DAJP0146186' 
			        ) p on p.vin = d.vin
where orden = 1
--and d.Ano_Periodo = 2023
--and d.Mes_Periodo = 7


```

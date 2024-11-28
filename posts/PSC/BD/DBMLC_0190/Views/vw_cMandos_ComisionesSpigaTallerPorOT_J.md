# View: vw_cMandos_ComisionesSpigaTallerPorOT_J

## Usa los objetos:
- [[ComisionesSpigaTallerPorOT]]
- [[UnidadDeNegocio]]

```sql










create VIEW [dbo].[vw_cMandos_ComisionesSpigaTallerPorOT_J]
AS
	SELECT  a.*,ltrim(rtrim(b.CodDepartamento)) CodDepartamento
	FROM (
		Select 
		IdComisionSpiga, Ano_Periodo, Mes_Periodo, Ano_Spiga, Mes_Spiga, CodigoEmpresa, Empresa, 
		Case 
			when CodigoEmpresa = 1 and codigocentro = 1 and CodigoSeccion = 46 then 12
			when CodigoEmpresa = 1 and codigocentro = 6 and CodigoSeccion = 57 then 67
			when CodigoEmpresa = 1 and codigocentro = 7 and CodigoSeccion = 635 then 27
			when CodigoEmpresa = 1 and codigocentro = 10 and CodigoSeccion = 71 then 19
			when CodigoEmpresa = 1 and codigocentro = 12 and CodigoSeccion = 330 then 51
			when CodigoEmpresa = 1 and codigocentro = 16 and CodigoSeccion = 562 then 65
			when CodigoEmpresa = 1 and codigocentro = 18 and CodigoSeccion = 573 then 46
			when CodigoEmpresa = 1 and codigocentro = 19 and CodigoSeccion = 228 then 1
			when CodigoEmpresa = 1 and codigocentro = 21 and CodigoSeccion = 553 then 44
			when CodigoEmpresa = 1 and codigocentro = 29 and CodigoSeccion = 98 then 25
			when CodigoEmpresa = 1 and codigocentro = 29 and CodigoSeccion = 364 then 16
			when CodigoEmpresa = 1 and codigocentro = 50 and CodigoSeccion = 21 then 6
			when CodigoEmpresa = 1 and codigocentro = 53 and CodigoSeccion = 57 then 67
			when CodigoEmpresa = 1 and codigocentro = 53 and CodigoSeccion = 66 then 72
			when CodigoEmpresa = 1 and codigocentro = 66 and CodigoSeccion = 33 then 9
			when CodigoEmpresa = 1 and codigocentro = 66 and CodigoSeccion = 71 then 19
			when CodigoEmpresa = 1 and codigocentro = 66 and CodigoSeccion = 254 then 68
			when CodigoEmpresa = 1 and codigocentro = 66 and CodigoSeccion = 609 then 68
			when CodigoEmpresa = 1 and codigocentro = 68 and CodigoSeccion = 255 then 66
			when CodigoEmpresa = 1 and codigocentro = 71 and CodigoSeccion = 7 then 2
			when CodigoEmpresa = 1 and codigocentro = 72 and CodigoSeccion = 57 then 67
			when CodigoEmpresa = 1 and codigocentro = 147 and CodigoSeccion = 42 then 11
			when CodigoEmpresa = 1 and codigocentro = 147 and CodigoSeccion = 412 then 7
			when CodigoEmpresa = 1 and codigocentro = 147 and CodigoSeccion = 635 then 27
			when CodigoEmpresa = 3 and codigocentro = 7 and CodigoSeccion = 106 then 27
			when CodigoEmpresa = 3 and codigocentro = 27 and CodigoSeccion = 26 then 7
			when CodigoEmpresa = 4 and codigocentro = 133 and CodigoSeccion = 621 then 133
			when CodigoEmpresa = 6 and codigocentro = 84 and CodigoSeccion = 444 then 81
			when CodigoEmpresa = 6 and codigocentro = 84 and CodigoSeccion = 482 then 99
			when CodigoEmpresa = 6 and codigocentro = 84 and CodigoSeccion = 512 then 81
			when CodigoEmpresa = 6 and codigocentro = 84 and CodigoSeccion = 585 then 76
			when CodigoEmpresa = 6 and codigocentro = 91 and CodigoSeccion = 418 then 75
			when CodigoEmpresa = 6 and codigocentro = 91 and CodigoSeccion = 440 then 80
			when CodigoEmpresa = 6 and codigocentro = 91 and CodigoSeccion = 506 then 111
			when CodigoEmpresa = 6 and codigocentro = 91 and CodigoSeccion = 626 then 28
			when CodigoEmpresa = 6 and codigocentro = 91 and CodigoSeccion = 455 then 88
			when CodigoEmpresa = 6 and codigocentro = 91 and CodigoSeccion = 468 then 93
			when CodigoEmpresa = 6 and codigocentro = 91 and CodigoSeccion = 497 then 106
			when CodigoEmpresa = 6 and codigocentro = 91 and CodigoSeccion = 506 then 111
			when CodigoEmpresa = 6 and codigocentro = 91 and CodigoSeccion = 821 then 106
			when CodigoEmpresa = 6 and codigocentro = 98 and CodigoSeccion = 589 then 130
			when CodigoEmpresa = 6 and codigocentro = 106 and CodigoSeccion = 464 then 91
			when CodigoEmpresa = 6 and codigocentro = 106 and CodigoSeccion = 478 then 98
			when CodigoEmpresa = 6 and codigocentro = 130 and CodigoSeccion = 478 then 98
			when CodigoEmpresa = 1 and codigocentro = 1 and CodigoSeccion = 37 then 10
			when CodigoEmpresa = 1 and codigocentro = 1 and CodigoSeccion = 323 then 59
			when CodigoEmpresa = 1 and codigocentro = 1 and CodigoSeccion = 616 then 51
			when CodigoEmpresa = 1 and codigocentro = 9 and CodigoSeccion = 228 then 1
			when CodigoEmpresa = 1 and codigocentro = 11 and CodigoSeccion = 344 then 70
			when CodigoEmpresa = 1 and codigocentro = 11 and CodigoSeccion = 673 then 147
			when CodigoEmpresa = 1 and codigocentro = 12 and CodigoSeccion = 228 then 1
			when CodigoEmpresa = 1 and codigocentro = 12 and CodigoSeccion = 616 then 51
			when CodigoEmpresa = 1 and codigocentro = 16 and CodigoSeccion = 341 then 18
			when CodigoEmpresa = 1 and codigocentro = 17 and CodigoSeccion = 76 then 20
			when CodigoEmpresa = 1 and codigocentro = 18 and CodigoSeccion = 98 then 25
			when CodigoEmpresa = 1 and codigocentro = 23 and CodigoSeccion = 415 then 25
			when CodigoEmpresa = 1 and codigocentro = 27 and CodigoSeccion = 412 then 7
			when CodigoEmpresa = 1 and codigocentro = 50 and CodigoSeccion = 26 then 53
			when CodigoEmpresa = 1 and codigocentro = 50 and CodigoSeccion = 57 then 67
			when CodigoEmpresa = 1 and codigocentro = 50 and CodigoSeccion = 330 then 51
			when CodigoEmpresa = 1 and codigocentro = 50 and CodigoSeccion = 615 then 51
			when CodigoEmpresa = 1 and codigocentro = 51 and CodigoSeccion = 228 then 1
			when CodigoEmpresa = 1 and codigocentro = 53 and CodigoSeccion = 1 then 50
			when CodigoEmpresa = 1 and codigocentro = 57 and CodigoSeccion = 37 then 10
			when CodigoEmpresa = 1 and codigocentro = 59 and CodigoSeccion = 46 then 12
			when CodigoEmpresa = 1 and codigocentro = 65 and CodigoSeccion = 364 then 16
			when CodigoEmpresa = 1 and codigocentro = 67 and CodigoSeccion = 66 then 72
			when CodigoEmpresa = 1 and codigocentro = 68 and CodigoSeccion = 255 then 66
			when CodigoEmpresa = 1 and codigocentro = 70 and CodigoSeccion = 42 then 11
			when CodigoEmpresa = 1 and codigocentro = 70 and CodigoSeccion = 673 then 147
			when CodigoEmpresa = 1 and codigocentro = 72 and CodigoSeccion = 26 then 53
			when CodigoEmpresa = 1 and codigocentro = 147 and CodigoSeccion = 344 then 70
			when CodigoEmpresa = 4 and codigocentro = 132 and CodigoSeccion = 620 then 132
			when CodigoEmpresa = 6 and codigocentro = 84 and CodigoSeccion = 422 then 76
			when CodigoEmpresa = 6 and codigocentro = 84 and CodigoSeccion = 459 then 89
			when CodigoEmpresa = 6 and codigocentro = 84 and CodigoSeccion = 472 then 94
			when CodigoEmpresa = 6 and codigocentro = 84 and CodigoSeccion = 491 then 103
			when CodigoEmpresa = 6 and codigocentro = 91 and CodigoSeccion = 468 then 93
			when CodigoEmpresa = 6 and codigocentro = 91 and CodigoSeccion = 487 then 104
			when CodigoEmpresa = 6 and codigocentro = 91 and CodigoSeccion = 497 then 106
			when CodigoEmpresa = 6 and codigocentro = 91 and CodigoSeccion = 542 then 113
			when CodigoEmpresa = 6 and codigocentro = 91 and CodigoSeccion = 418 then 75
			when CodigoEmpresa = 6 and codigocentro = 91 and CodigoSeccion = 487 then 104
			when CodigoEmpresa = 6 and codigocentro = 91 and CodigoSeccion = 819 then 111
			when CodigoEmpresa = 6 and codigocentro = 91 and CodigoSeccion = 820 then 75
			when CodigoEmpresa = 6 and codigocentro = 98 and CodigoSeccion = 464 then 91
			when CodigoEmpresa = 6 and codigocentro = 106 and CodigoSeccion = 506 then 111
			when CodigoEmpresa = 6 and codigocentro = 111 and CodigoSeccion = 464 then 94
			when CodigoEmpresa = 6 and codigocentro = 111 and CodigoSeccion = 497 then 106
			else Codigocentro 
		end CodigoCentro ,
		Centro, CodigoSeccion, Seccion, NumOT, NumeroFacturaTaller, NumeroAlbaran, FechaAperturaOrden, 
								 FechaFactura, fechaentrega, Placa, VIN, FkServicioTipos, Marcaveh, NombreMarca, Gama, NombreGama, NitCliente, NombreCliente, CodigoCategoriaCliente, CategoriaCliente, TipoCargo, TipoIntCargo, marca, Codigo, 
								 descripcion, TipoOperacion, ValorUnitario, UnidadesVendidas, PorcentajeDescuento, ImporteImpuesto, CedulaOperario, NombreOperario, CedulaAsesorServicioAlta, AsesorServicioAlta, CedulaAsesorServicioResponsable, 
								 AsesorServicioResponsable, CedulaAsesorServicioCierre, AsesorServicioCierre, CedulaAsesorServicioRetirada, AsesorServicioRetirada, TrabajoRetorno, Cotizacion, CampañaRepuesto, CodClas1, DescripClas1, CodClas2, 
								 DescripClas2, CodClas3, DescripClas3, CodClas4, DescripClas4, CodClas5, DescripClas5, CodClas6, DescripClas6, CedulaVendedorRepuestos, NombreVendedorRepuestos, CedulaBodeguero, NombreBodeguero, ValorNeto, 
								 Coste, IdImputaciontipos, TipoImputacion, DescripcionTrabajo
		from ComisionesSpigaTallerPorOT
	
	) a
	left join UnidadDeNegocio b on a.CodigoEmpresa = b.CodEmpresa and a.CodigoCentro = b.CodCentro and a.CodigoSeccion = b.CodSeccion

```
